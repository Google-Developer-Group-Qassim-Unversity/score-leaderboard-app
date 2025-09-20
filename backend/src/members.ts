import type { Response, Request } from "express"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type MemberPoints = {
    id: number;
    name: string;
    points: number;
};

// Assuming you use Express.js, as in your example

export async function handleMembers(req: Request, res: Response) {
    console.log("Fetching members with points...");
    const grouped = await prisma.members_points.groupBy({
        by: ['member_id', 'member_name'],
        _sum: {
            points_per_action: true,
        },
        orderBy: {
            _sum: {
                points_per_action: 'desc',
            },
        },
    });
    console.log("fetched grouped data:", grouped);
    
    // Map Prisma groupBy result to JSON
    const result = grouped.map(row => ({
        id: row.member_id,
        name: row.member_name,
        points: row._sum?.points_per_action ?? 0,
    }));

    res.status(200).json(result).end();
}

// export async function handleMembersById(req: Request, res: Response) {
//     const memberId = req.params.id;
//     const member = await prisma.members.findFirst({
//         where: {id: parseInt(memberId)}
//     })
//     const history = await prisma.members_history.findMany({
//         where: {
//             id: parseInt(memberId)
//         },
//         omit : {
//             id: true,
//             name: true,
//         }
//     })

//     // this could be problematic since I am not getting my numbers from the DB and instead are making assumtions.
//     let totalPoints = 0;
//     for (const event of history) {
//         totalPoints += event.action_points
//     }
//     return res.json({
//         id: member?.id,
//         name: member?.name,
//         points: totalPoints,
//         events: history
//     })
// }

export async function handleMembersById(req: Request, res: Response) {
    const memberId = parseInt(req.params.id);

    // Get all member event history from the view for this member
    const history = await prisma.members_points.findMany({
        where: { member_id: memberId },
        select: {
            log_id: true,
            event_name: true,
            points_per_action: true,
        }
    });

    // Calculate total points
    const totalPoints = history.reduce(
        (sum, event) => sum + event.points_per_action,
        0
    );

    // Optionally, get member info from the first record in history
    let memberName = '';
    if (history.length > 0) {
        // Use the name from the first event record
        memberName = (history[0] as any).memeber_name || '';
    } else {
        // Or fallback to a lookup
        const member = await prisma.members.findFirst({
            where: { id: memberId },
            select: { name: true }
        });
        memberName = member?.name || '';
    }

    return res.json({
        id: memberId,
        name: memberName,
        points: totalPoints,
        events: history
    });
}

export async function handleMembersCount(req: Request, res: Response) {
    const membersCount = await prisma.members.count();

    res.status(200).json({
        members_count: membersCount
    })
}