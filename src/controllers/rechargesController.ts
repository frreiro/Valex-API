import { Request, Response } from 'express';
import rechargesServices from '../services/rechargesServices.js';

export async function recharge(req: Request, res: Response) {
    const { amount } = req.body;
    const { card } = res.locals

    await rechargesServices.recharge(card, amount);
    res.sendStatus(200)
}