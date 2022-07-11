import { Response, Request, NextFunction } from "express";

export async function amountValidate(req: Request, res: Response, next: NextFunction) {
    const { amount } = req.body;
    if (amount <= 0) return res.sendStatus(422);
    next();
}