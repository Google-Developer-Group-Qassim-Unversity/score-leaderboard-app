import type { Response, Request } from "express"
import { members_gender, PrismaClient } from "@prisma/client";
import { log } from "console";
import dotenv from "dotenv";
dotenv.config();

if (process.env.DEV_DATABASE_URL) {
    console.log("Using development database URL", process.env.DEV_DATABASE_URL);
    process.env.DATABASE_URL = process.env.DEV_DATABASE_URL;
}

const prisma = new PrismaClient();

export type MemberPoints = {
    id: number;
    name: string;
    points: number;
};

export type MemberHistory = {
    event_name: string;
    action_name: string;
    action_points: number;
    start_date: Date;
}

export async function handleMembers(req: Request, res: Response) {
    console.log("Fetching members with points...");
    
    // Get all members_points records
    const membersPoints = await prisma.members_points.findMany();
    
    // Get all unique member_log_ids to query absences efficiently
    const memberLogIds = [...new Set(membersPoints.map(record => record.member_log_id))];
    
    // Get all unique log_ids to query modifications efficiently
    const logIds = [...new Set(membersPoints.map(record => record.log_id))];
    
    // Get all absences for these member_log_ids in bulk
    const allAbsences = await prisma.absence.findMany({
        where: {
            member_log_id: {
                in: memberLogIds,
            },
        },
    });
    
    // Get all modifications for these log_ids in bulk
    const allModifications = await prisma.modifications.findMany({
        where: {
            log_id: {
                in: logIds,
            },
        },
    });
    
    // Process each record to calculate adjusted points
    const processedPoints = membersPoints.map((record) => {
        // Calculate number of days in the event (inclusive)
        const startDate = new Date(record.start_date);
        const endDate = new Date(record.end_date);
        const diffTime = endDate.getTime() - startDate.getTime();
        const eventDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 for inclusive
        
        // Count absences for this member during this event period
        const absenceCount = allAbsences.filter(absence => 
            absence.member_log_id === record.member_log_id &&
            absence.date >= record.start_date &&
            absence.date <= record.end_date
        ).length;
        
        // Calculate attended days
        const attendedDays = eventDays - absenceCount;
        
        // Calculate base adjusted points (0 if attended days <= 0)
        let adjustedPoints = attendedDays > 0 ? record.action_points * attendedDays : 0;
        
        // Apply modifications for this log_id
        const modifications = allModifications.filter(mod => mod.log_id === record.log_id);
        modifications.forEach(mod => {
            if (mod.type === 'bonus') {
                adjustedPoints += mod.value;
            } else if (mod.type === 'discount') {
                adjustedPoints -= mod.value;
            }
        });
        
        // Ensure points don't go below 0
        adjustedPoints = Math.max(0, adjustedPoints);
        
        return {
            member_id: record.member_id,
            member_name: record.member_name,
            adjustedPoints,
            member_gender: record.member_gender
        };
    });
    
    // Group by member and sum adjusted points
    const memberPointsMap = new Map<number, { name: string; points: number; gender: string }>();

    processedPoints.forEach(({ member_id, member_name, adjustedPoints, member_gender }) => {
        if (memberPointsMap.has(member_id)) {
            memberPointsMap.get(member_id)!.points += adjustedPoints;
        } else {
            memberPointsMap.set(member_id, { name: member_name, points: adjustedPoints, gender: member_gender });
        }
    });
    
    // Convert to array and sort by points descending
    const result = Array.from(memberPointsMap.entries())
    .map(([id, { name, points, gender }]) => ({ id, name, points, gender }))
    
    const splitResult = {
      "Male": result.filter(m => m.gender === members_gender.Male).sort((a, b) => b.points - a.points),
      "Female": result.filter(m => m.gender === members_gender.Female).sort((a, b) => b.points - a.points)
    }

    res.status(200).json(splitResult).end();
}

export async function handleMembersById(
  req: Request,
  res: Response
) {
  const memberId = parseInt(req.params.id, 10);

  // 1. Fetch the member
  const member = await prisma.members.findUnique({
    where: { id: memberId },
  });
  if (!member) {
    return res.status(404).json({ error: 'Member not found' });
  }

  // 2. Fetch the raw history (includes log_id)
  const history = await prisma.members_points.findMany({
    where: { member_id: memberId },
  });

  // 3. Gather IDs for bulk‐fetch
  const memberLogIds = [...new Set(history.map(r => r.member_log_id))];
  const logIds       = [...new Set(history.map(r => r.log_id))];

  // 4. Bulk‐fetch absences & modifications
  const [allAbsences, allMods] = await Promise.all([
    prisma.absence.findMany({
      where: { member_log_id: { in: memberLogIds } }
    }),
    prisma.modifications.findMany({
      where: { log_id: { in: logIds } }
    })
  ]);

  // 5. Process each event
  const processed = history.map(rec => {
    const start = new Date(rec.start_date);
    const end   = new Date(rec.end_date);
    const days  = Math.floor((end.getTime() - start.getTime()) / 86400000) + 1;

    const absCount = allAbsences.filter(a =>
      a.member_log_id === rec.member_log_id &&
      a.date >= rec.start_date &&
      a.date <= rec.end_date
    ).length;

    const attended = Math.max(0, days - absCount);
    let pts = attended * rec.action_points;

    // apply bonuses/discounts on this log
    allMods
      .filter(m => m.log_id === rec.log_id)
      .forEach(m => {
        if (m.type === 'bonus')    pts += m.value;
        else if (m.type === 'discount') pts -= m.value;
      });
    pts = Math.max(0, pts);

    return {
      event_name:     rec.event_name,
      start_date:     rec.start_date,
      end_date:       rec.end_date,
      action_name:    rec.action_name,
      original_points: rec.action_points,
      event_days:     days,
      absences:       absCount,
      attended_days:  attended,
      points:         pts,
    };
  });

  // 6. Sort by start_date descending
  processed.sort((a, b) =>
    new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
  );

  // 7. Total points
  const totalPoints = processed.reduce((sum, ev) => sum + ev.points, 0);

  // 8. Return payload
  return res.status(200).json({
    id:     member.id,
    name:   member.name,
    points: totalPoints,
    events: processed,
  });
}


export async function handleMembersCount(req: Request, res: Response) {
    const membersCount = await prisma.members.count();

    res.status(200).json({
        members_count: membersCount
    })
}