import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



export async function handleDepartments(req: Request, res: Response) {
    console.log("Fetching departments with points...");
    
    // 1. Get all departments_points records
    const departmentsPoints = await prisma.departments_points.findMany();
    
    // 2. Process each record to calculate points
    // No absences to account for!
    const processedPoints = departmentsPoints.map((record) => {
        // Number of event days (inclusive)
        const startDate = new Date(record.start_date);
        const endDate = new Date(record.end_date); // These need to exist on your view!
        const diffTime = endDate.getTime() - startDate.getTime();
        const eventDays =
            Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 for inclusive
        
        // Points for this log record
        const points = record.action_points * eventDays;

        return {
            department_id: record.department_id,
            department_name: record.department_name,
            points,
        };
    });

    // 3. Group by department and sum points
    const deptPointsMap = new Map<number, { name: string; points: number }>();

    processedPoints.forEach(({ department_id, department_name, points }) => {
        if (deptPointsMap.has(department_id)) {
            deptPointsMap.get(department_id)!.points += points;
        } else {
            deptPointsMap.set(department_id, { name: department_name, points });
        }
    });

    // 4. Convert to array and sort descending
    const result = Array.from(deptPointsMap.entries())
        .map(([id, { name, points }]) => ({ id, name, points }))
        .sort((a, b) => b.points - a.points);

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