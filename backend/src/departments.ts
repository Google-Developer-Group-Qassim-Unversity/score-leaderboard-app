import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function handleDepartments(req: Request, res: Response) {
    const grouped = await prisma.departments_points.groupBy({
        by: ['id', 'department_name'],
        _sum: {
            points: true,
        },
        orderBy: {
            _sum: {
                points: 'desc',
            },
        },
    });

    const result = grouped.map(row => ({
        id: row.id,
        name: row.department_name,
        points: row._sum?.points ?? 0,
    }));
    res.status(200).json(result).end();
}

export async function handleDepartmentsById(req: Request, res: Response) {
    const departmentId = req.params.id;
    const department = await prisma.departments.findFirst({
        where: {id: parseInt(departmentId)}
    })
    const history = await prisma.departments_history.findMany({
        where: {
            id: parseInt(departmentId)
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
        ...department,
        points: totalPoints,
        events: history
    })
}

export async function handleDepartmentsCount(req: Request, res: Response) {
    const departmntsCount = await prisma.departments.count();

    res.status(200).json({
        members_count: departmntsCount
    })
}