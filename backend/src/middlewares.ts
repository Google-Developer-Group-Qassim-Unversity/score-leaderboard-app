import type { Response, Request, NextFunction } from "express";
import fs from 'fs';

export function logErrorsMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    const MAX_LINES = 10000;
    const FILE_NAME = 'errors.log';
    // this is an event listener that logs the error when the response gets sent.
    res.on("finish", () => {
        if (!fs.existsSync(FILE_NAME)) {
            fs.writeFileSync(FILE_NAME, ''); // Create empty file
        }
        resetTooLong(FILE_NAME, MAX_LINES);
        const message = `Error: responded to request from '${req.hostname}' with status ${res.statusCode} and got error\n---${err.stack || err}\n---\n`;
        console.log(message);
        fs.appendFileSync(FILE_NAME, message);
    });

    if (!res.headersSent) {
        res.status(500).send("Internal Server Error");
    }
}

function resetTooLong(FILE_NAME: string, MAX_LINES: number) {
    const fileContent = fs.readFileSync(FILE_NAME, "utf-8");
    const lineCount = fileContent.split("\n").length - 1;

    if (lineCount > MAX_LINES) {
        fs.writeFileSync(FILE_NAME, "", "utf-8");
        console.log("\x1b[36mLog file reset\x1b[0m");
    }
}