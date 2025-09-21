import type { Response, Request } from "express"
import { PrismaClient } from "@prisma/client";

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
    
    // Get all absences for these member_log_ids in bulk
    const allAbsences = await prisma.absence.findMany({
        where: {
            member_log_id: {
                in: memberLogIds,
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
        
        // Calculate adjusted points (0 if attended days <= 0)
        const adjustedPoints = attendedDays > 0 ? record.action_points * attendedDays : 0;
        
        return {
            member_id: record.member_id,
            member_name: record.member_name,
            adjustedPoints,
        };
    });
    
    // Group by member and sum adjusted points
    const memberPointsMap = new Map<number, { name: string; points: number }>();
    
    processedPoints.forEach(({ member_id, member_name, adjustedPoints }) => {
        if (memberPointsMap.has(member_id)) {
            memberPointsMap.get(member_id)!.points += adjustedPoints;
        } else {
            memberPointsMap.set(member_id, { name: member_name, points: adjustedPoints });
        }
    });
    
    // Convert to array and sort by points descending
    const result = Array.from(memberPointsMap.entries())
        .map(([id, { name, points }]) => ({ id, name, points }))
        .sort((a, b) => b.points - a.points);

    res.status(200).json(result).end();
}

export async function handleMembersById(req: Request, res: Response) {
    const memberId = req.params.id;
    const member = await prisma.members.findFirst({
        where: {id: parseInt(memberId)}
    })
    
    const history = await prisma.members_points.findMany({
        where: {
            member_id: parseInt(memberId)
        },
        omit : {
            log_id: true,
            member_id: true,
            member_name: true
        }
    })

    // Get all unique member_log_ids for this member to query absences
    const memberLogIds = [...new Set(history.map(record => record.member_log_id))];
    
    // Get all absences for this member's events
    const memberAbsences = await prisma.absence.findMany({
        where: {
            member_log_id: {
                in: memberLogIds,
            },
        },
    });

    // Process each event to calculate adjusted points
    const processedHistory = history.map((record) => {
        // Calculate number of days in the event (inclusive)
        const startDate = new Date(record.start_date);
        const endDate = new Date(record.end_date);
        const diffTime = endDate.getTime() - startDate.getTime();
        const eventDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 for inclusive
        
        // Count absences for this specific event
        const absenceCount = memberAbsences.filter(absence => 
            absence.member_log_id === record.member_log_id &&
            absence.date >= record.start_date &&
            absence.date <= record.end_date
        ).length;
        
        // Calculate attended days
        const attendedDays = eventDays - absenceCount;
        
        // Calculate adjusted points (0 if attended days <= 0)
        const adjustedPoints = attendedDays > 0 ? record.action_points * attendedDays : 0;
        
        return {
            event_name: record.event_name,
            start_date: record.start_date,
            action_points: adjustedPoints, // This now represents the final calculated points
            action_name: record.action_name,
            // Optional: include additional info for debugging/transparency
            original_points: record.action_points,
            event_days: eventDays,
            absences: absenceCount,
            attended_days: attendedDays
        };
    });

    // Calculate total points from adjusted points
    let totalPoints = 0;
    for (const event of processedHistory) {
        totalPoints += event.action_points;
    }

    return res.json({
        id: member?.id,
        name: member?.name,
        points: totalPoints,
        events: processedHistory
    })
}


export async function handleMembersCount(req: Request, res: Response) {
    const membersCount = await prisma.members.count();

    res.status(200).json({
        members_count: membersCount
    })
}