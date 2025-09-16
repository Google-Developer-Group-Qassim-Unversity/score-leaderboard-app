import type { Response, Request } from "express"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type MemberPoints = {
    id: number;
    name: string;
    points: number;
};

export async function handleMembers(req: Request, res: Response) {
    const grouped = await prisma.members_points.groupBy({
        by: ['id', 'member_name'],
        _sum: {
            points: true,
        },
        orderBy: {
            _sum: {
                points: 'desc',
            },
        },
    });

    // Map Prisma groupBy result to JSON
    const result = grouped.map(row => ({
        id: row.id,
        name: row.member_name,
        points: row._sum?.points ?? 0,
    }));

    res.status(200).json(result).end();
}

export async function handleMembersById(req: Request, res: Response) {
    const memberId = req.params.id;
    const member = await prisma.members.findFirst({
        where: {id: parseInt(memberId)}
    })
    const history = await prisma.members_history.findMany({
        where: {
            id: parseInt(memberId)
        },
        omit : {
            id: true,
            name: true,
        }
    })

    // this could be problematic since I am not getting my numbers from the DB and instead are making assumtions.
    let totalPoints = 0;
    for (const event of history) {
        totalPoints += event.action_points
    }
    return res.json({
        id: member?.id,
        name: member?.name,
        points: totalPoints,
        events: history
    })
}

export async function handleMembersCount(req: Request, res: Response) {
    const membersCount = await prisma.members.count();

    res.status(200).json({
        members_count: membersCount
    })
}