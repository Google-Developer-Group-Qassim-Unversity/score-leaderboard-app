import express from "express";
import { PrismaClient } from "@prisma/client";
import type {Response, Request} from "express"
const app = express();
const PORT = 8000;
const prisma = new PrismaClient();

app.all("/", handleRoot);
app.get("/departments", handleDepartments);
app.get("/members", handleMembers);


async function handleRoot(req: Request, res: Response) {
    res.status(200).send("<h1>Ready</h1>").end()
}

async function handleDepartments(req: Request, res: Response) {
    const result = await prisma.departments_points.findMany();
    res.json(result).status(200).end();
}

async function handleMembers(req: Request, res: Response) {
    const result = await prisma.members_points.findMany();
    res.json(result).status(200).end();
}

app.listen(PORT, () => {
    console.log(`\t🚀 Server is running at \x1b[34mhttp://localhost:${PORT}\x1b[0m`);
    console.log(`\t🏨 Departments leaderboard at: \x1b[32mhttp://localhost:${PORT}/departments\x1b[0m`);
    console.log(`\t🤵 Members leaderboard at: \x1b[35mhttp://localhost:${PORT}/members\x1b[0m`);
    
})