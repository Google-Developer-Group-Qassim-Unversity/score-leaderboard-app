import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

if (process.env.DEV_DATABASE_URL) {
  process.env.DATABASE_URL = process.env.DEV_DATABASE_URL;
}
const prisma = new PrismaClient();


export async function handleDepartments(req: Request, res: Response) {
    console.log("Fetching departments with points...");

    // 1. Get all departments (to ensure we return zeros for those with no points)
    const allDepartments = await prisma.departments.findMany({
        select: {
            id: true,
            name: true,
            type: true,
        },
    });

    // 2. Get all departments_points records
    const departmentsPoints = await prisma.departments_points.findMany();

    // 3. Get all unique log_ids to query modifications efficiently
    const logIds = [...new Set(departmentsPoints.map(record => record.log_id))];

    // 4. Get all modifications for these log_ids in bulk
    const allModifications = await prisma.modifications.findMany({
        where: {
            log_id: {
                in: logIds,
            },
        },
    });

    // 5. Process each record to calculate adjusted points
    const processedPoints = departmentsPoints.map((record) => {
        // Number of event days (inclusive)
        const startDate = new Date(record.start_date);
        const endDate = new Date(record.end_date);
        const diffTime = endDate.getTime() - startDate.getTime();
        const eventDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

        // Base points for this log record
        let points = record.action_points * eventDays;

        // Apply modifications for this log_id
        const modifications = allModifications.filter(mod => mod.log_id === record.log_id);
        modifications.forEach(mod => {
            if (mod.type === 'bonus') {
                points += mod.value;
            } else if (mod.type === 'discount') {
                points -= mod.value;
            }
        });

        // Ensure points don't go below 0
        points = Math.max(0, points);

        return {
            department_id: record.department_id,
            department_name: record.department_name,
            points,
        };
    });

    // 6. Group by department and sum points
    const deptPointsMap = new Map<number, { name: string; points: number;}>();
    processedPoints.forEach(({ department_id, department_name, points}) => {
        if (deptPointsMap.has(department_id)) {
            deptPointsMap.get(department_id)!.points += points;
        } else {
            deptPointsMap.set(department_id, { name: department_name, points });
        }
    });

    // 7. Convert to array
    const result = Array.from(deptPointsMap.entries())
        .map(([id, { name, points }]) => ({ id, name, points }));

    // 8. Include departments with 0 points if missing
    for (const dept of allDepartments) {
        if (!result.find((r) => r.id === dept.id)) {
            result.push({
                id: dept.id,
                name: dept.name,
                points: 0,
            });
        }
    }

    // 9. Split departments into two types
    const splitDepts = {
        "Specialized": [] as any[],
        "Administrative": [] as any[],
    }
    
    for (const dept of allDepartments) {
        if (dept.type === 'practical') {
            splitDepts["Specialized"].push(result.find(r => r.id === dept.id)!);
        } else {
            splitDepts["Administrative"].push(result.find(r => r.id === dept.id)!);
        }
    }

    console.log("Splitted depts: ",splitDepts);
    
    // 10. Sort descending by points
    splitDepts["Specialized"].sort((a, b) => b.points - a.points);
    splitDepts["Administrative"].sort((a, b) => b.points - a.points);

    res.status(200).json(splitDepts).end();
}


export async function handleDepartmentsById(req: Request, res: Response) {
    const departmentId = parseInt(req.params.id, 10);

    // 1. Fetch department info
    const department = await prisma.departments.findUnique({
        where: { id: departmentId }
    });
    if (!department) {
        return res.status(404).json({ error: 'Department not found' });
    }

    // 2. Fetch department event history (keep log_id for modifications)
    const history = await prisma.departments_points.findMany({
        where: {
            department_id: departmentId,
        },
    });

    // 3. Get all unique log_ids to query modifications efficiently
    const logIds = [...new Set(history.map(record => record.log_id))];

    // 4. Bulk fetch modifications for these log_ids
    const allModifications = await prisma.modifications.findMany({
        where: {
            log_id: {
                in: logIds,
            },
        },
    });

    // 5. Process each event to calculate adjusted points
    const processedHistory = history.map((record) => {
        // Compute event duration in days (inclusive)
        const startDate = new Date(record.start_date);
        const endDate = new Date(record.end_date);
        const diffTime = endDate.getTime() - startDate.getTime();
        const eventDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

        // Base points = action_points * eventDays
        let points = record.action_points * eventDays;

        // Apply modifications for this log_id
        const modifications = allModifications.filter(mod => mod.log_id === record.log_id);
        modifications.forEach(mod => {
            if (mod.type === 'bonus') {
                points += mod.value;
            } else if (mod.type === 'discount') {
                points -= mod.value;
            }
        });

        // Ensure points don't go below 0
        points = Math.max(0, points);

        return {
            event_name: record.event_name,
            start_date: record.start_date,
            end_date: record.end_date,
            action_name: record.action_name,
            original_points: record.action_points,
            event_days: eventDays,
            points: points, // final calculated points
        };
    });

    // 6. Sort by start_date descending (latest first)
    processedHistory.sort((a, b) => 
        new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
    );

    // 7. Calculate total points
    const totalPoints = processedHistory.reduce((sum, event) => sum + event.points, 0);

    // 8. Return response
    return res.status(200).json({
        id: department.id,
        name: department.name,
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