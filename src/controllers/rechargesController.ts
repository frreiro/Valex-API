import { Request, Response } from 'express';
import rechargesServices from '../services/rechargesServices.js';

// recebe {cardId, amount}
export async function recharge(req: Request, res: Response) {
    const { amount } = req.body;
    const { card, companyId } = res.locals
    await rechargesServices.recharge(card, amount, companyId);
    res.sendStatus(200)
}