import { Response, Request, NextFunction } from "express";


export async function errorHandler(error, req: Request, res: Response, next: NextFunction) {
    console.log(error);
    if (error.type === "Unprocessable Entity") return res.sendStatus(422);
    return res.sendStatus(500);
}