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
    const history = await prisma.members_history.findMany({
        where: {
            id: parseInt(memberId)
        }
    })

    res.status(200).json(history);
}

export async function handleMembersCount(req: Request, res: Response) {
    const membersCount = await prisma.members.count();

    res.status(200).json({
        members_count: membersCount
    })
}