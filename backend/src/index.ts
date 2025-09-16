import express from "express";
import { PrismaClient } from "@prisma/client";
import type { Response, Request } from "express"
import cors from "cors";
import { logErrorsMiddleware } from "./middlewares.js";
import { handleMembers, handleMembersCount, handleMembersById } from "./members.js";
import { handleDepartments, handleDepartmentsCount, handleDepartmentsById } from "./departments.js";

const app = express();
const PORT = 8000;
export const prisma = new PrismaClient();

app.use(cors());

app.all("/", handleRoot);

app.get("/departments", async (req, res, next) => {
    try {
        await handleDepartments(req, res);
    } catch (error) {
        next(error);
    }
});

app.get("/departments/count", async (req, res, next) => {
    try {
        await handleDepartmentsCount(req, res);
    } catch (error) {
        next(error);
    }
});

app.get("/departments/:id", async (req, res, next) => {
    try {
        await handleDepartmentsById(req, res);
    } catch (error) {
        next(error);
    }
});

app.get("/members", async (req, res, next) => {
    try {
        await handleMembers(req, res);
    } catch (error) {
        next(error);
    }
});

app.get("/members/count", async (req, res, next) => {
    try {
        await handleMembersCount(req, res);
    } catch (error) {
        next(error);
    }
});

app.get("/members/:id", async (req, res, next) => {
    try {
        await handleMembersById(req, res);
    } catch (error) {
        next(error);
    }
});



async function handleRoot(req: Request, res: Response) {
    res.status(200).send("<h1>Score Leaderboard API is Ready ✅</h1>").end()
}


app.use(logErrorsMiddleware);

app.listen(PORT, () => {
    console.log(`\t🚀 Server is running at \x1b[34mhttp://localhost:${PORT}\x1b[0m`);
    console.log(`\t🏨 Departments leaderboard at: \x1b[32mhttp://localhost:${PORT}/departments\x1b[0m`);
    console.log(`\t🤵 Members leaderboard at: \x1b[35mhttp://localhost:${PORT}/members\x1b[0m`);

})