import { Request, Response } from "express";
import buyServices from "../services/purchaseServices.js";

// recebe {cardId, password, businessId, amount}
export async function buyPOS(req: Request, res: Response) {
    const { cardId, password, businessId, amount } = req.body;
    const { card } = res.locals;
    await buyServices.setPayment({ cardId, password, businessId, amount }, card)
    res.sendStatus(201);
}