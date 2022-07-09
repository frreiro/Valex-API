import { Request, Response, NextFunction } from 'express';
import customParseFormat from "dayjs/plugin/customParseFormat.js"
import dayjs from "dayjs"
dayjs.extend(customParseFormat)

import { findById } from '../../repositories/cardRepository.js';

export async function cardIdValidate(req: Request, res: Response, next: NextFunction) {
    const { cardId }: { cardId: number } = req.body;

    const card = await findById(cardId);
    if (!card) return res.sendStatus(404);

    const { expirationDate } = card;
    if (dayjs().isAfter(dayjs(expirationDate, "MM/YY"))) return res.sendStatus(422);

    const { password } = card
    if (password) return res.sendStatus(422);
    res.locals.card = card;
    next();
}




