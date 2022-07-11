import { Request, Response, NextFunction } from 'express';
import customParseFormat from "dayjs/plugin/customParseFormat.js"
import dayjs from "dayjs"
dayjs.extend(customParseFormat)

import { findById } from '../../repositories/cardRepository.js';

export async function cardIdValidate(req: Request, res: Response, next: NextFunction) {
    const { cardId }: { cardId: number } = req.body;

    const card = await findById(cardId);
    if (!card) return res.sendStatus(404);

    res.locals.card = card;
    next();
}

export async function passwordValidate(req: Request, res: Response, next: NextFunction) {
    const { cardId }: { cardId: number } = req.body;
    const { card } = res.locals

    const { password } = card
    if (password) return res.sendStatus(422);
    next();
}

export async function experationDateValidate(req: Request, res: Response, next: NextFunction) {
    const { cardId }: { cardId: number } = req.body;
    const { card } = res.locals

    const { expirationDate } = card;
    if (dayjs().isAfter(dayjs(expirationDate, "MM/YY"))) return res.sendStatus(422);
    next();
}





