import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function handleDepartments(req: Request, res: Response) {
    const grouped = await prisma.departments_points.groupBy({
        by: ['department_id', 'department_name'],
        _sum: {
            action_points: true,
        },
        orderBy: {
            _sum: {
                action_points: 'desc',
            },
        },
    });

    // Map Prisma groupBy result to JSON
    const result = grouped.map(row => ({
        id: row.department_id,
        name: row.department_name,
        points: row._sum?.action_points ?? 0,
    }));

    res.status(200).json(result).end();
}

export async function handleDepartmentsById(req: Request, res: Response) {
    const departmentId = req.params.id;
    const department = await prisma.departments.findFirst({
        where: {id: parseInt(departmentId)}
    })
    const history = await prisma.departments_points.findMany({
        where: {
            department_id: parseInt(departmentId)
        },
        omit : {
            log_id: true,
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
    const departmentCount = await prisma.departments.count();

    res.status(200).json({
        departments_count: departmentCount
    })
}