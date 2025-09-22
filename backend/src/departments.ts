import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function handleDepartments(req: Request, res: Response) {
    console.log("Fetching departments with points...");

    // 1. Get all departments (to ensure we return zeros for those with no points)
    const allDepartments = await prisma.departments.findMany({
        select: {
            id: true,
            name: true,
        },
    });

    // 2. Get all departments_points records
    const departmentsPoints = await prisma.departments_points.findMany();

    // 3. Process each record to calculate points (no absences to account for)
    const processedPoints = departmentsPoints.map((record) => {
        // Number of event days (inclusive)
        const startDate = new Date(record.start_date);
        const endDate = new Date(record.end_date); // These need to exist on your view!
        const diffTime = endDate.getTime() - startDate.getTime();
        const eventDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

        // Points for this log record
        const points = record.action_points * eventDays;

        return {
            department_id: record.department_id,
            department_name: record.department_name,
            points,
        };
    });

    // 4. Group by department and sum points
    const deptPointsMap = new Map<number, { name: string; points: number }>();
    processedPoints.forEach(({ department_id, department_name, points }) => {
        if (deptPointsMap.has(department_id)) {
            deptPointsMap.get(department_id)!.points += points;
        } else {
            deptPointsMap.set(department_id, { name: department_name, points });
        }
    });

    // 5. Convert to array
    const result = Array.from(deptPointsMap.entries())
        .map(([id, { name, points }]) => ({ id, name, points }));

    // 6. Include departments with 0 points if missing
    for (const dept of allDepartments) {
        if (!result.find((r) => r.id === dept.id)) {
            result.push({
                id: dept.id,
                name: dept.name,
                points: 0,
            });
        }
    }

    // 7. Sort descending by points
    result.sort((a, b) => b.points - a.points);

    res.status(200).json(result).end();
}

export async function handleDepartmentsById(req: Request, res: Response) {
    const departmentId = req.params.id;
    // Fetch department info if needed
    const department = await prisma.departments.findFirst({
        where: { id: parseInt(departmentId) }
    });

    // Fetch department event history
    const history = await prisma.departments_points.findMany({
        where: {
            department_id: parseInt(departmentId),
        },
        omit: {
            log_id: true,
            department_id: true,
            department_name: true,
        }
    });

    // For each event, calculate total points (days x action_points)
    const processedHistory = history.map((record) => {
        // Compute event duration in days (inclusive)
        const startDate = new Date(record.start_date);
        const endDate = new Date(record.end_date); // Ensure this field exists!
        const diffTime = endDate.getTime() - startDate.getTime();
        const eventDays =
            Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // Inclusive

        // Points = action_points * eventDays (no absence logic)
        const points = record.action_points * eventDays;

        return {
            event_name: record.event_name,
            start_date: record.start_date,
            action_points: points, // final, calculated points for this event
            action_name: record.action_name,
            // Optional: debug fields
            original_points: record.action_points,
            event_days: eventDays,
        };
    });

    // Sum over all events
    const totalPoints = processedHistory.reduce((acc, curr) => acc + curr.action_points, 0);

    return res.json({
        id: department?.id,
        name: department?.name,
        points: totalPoints,
        events: processedHistory,
    });
}

export async function handleDepartmentsCount(req: Request, res: Response) {
    const departmentCount = await prisma.departments.count();

    res.status(200).json({
        departments_count: departmentCount
    })
}