import express from "express";
import { PrismaClient } from "@prisma/client";
import type { Response, Request } from "express"
import cors from "cors";
const app = express();
const PORT = 8000;
const prisma = new PrismaClient();

app.use(cors());

app.all("/", handleRoot);
app.get("/departments", handleDepartments);
app.get("/members", handleMembers);


async function handleRoot(req: Request, res: Response) {
    res.status(200).send("<h1>Ready</h1>").end()
}

async function handleDepartments(req: Request, res: Response) {
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
    res.json(result).status(200).end();
}

export type MemberPoints = {
    id: number;
    name: string;
    points: number;
};

async function handleMembers(req: Request, res: Response) {
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

    console.log(result);
    res.json(result).status(200).end();
}

app.listen(PORT, () => {
    console.log(`\t🚀 Server is running at \x1b[34mhttp://localhost:${PORT}\x1b[0m`);
    console.log(`\t🏨 Departments leaderboard at: \x1b[32mhttp://localhost:${PORT}/departments\x1b[0m`);
    console.log(`\t🤵 Members leaderboard at: \x1b[35mhttp://localhost:${PORT}/members\x1b[0m`);

})