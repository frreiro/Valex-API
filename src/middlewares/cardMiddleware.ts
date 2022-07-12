import { Request, Response, NextFunction } from 'express';
import cardSchemas from '../schemas/cardSchemas.js';
import { findByApiKey } from '../repositories/companyRepository.js';
import { findById } from '../repositories/cardRepository.js';

export async function tokenValidate(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const key = authorization.split("Bearer").at(1).trim();
    const company = await findByApiKey(key);
    if (!company) return res.sendStatus(401);
    res.locals.companyId = company.id;
    next()
}

export function createCardValidate(req: Request, res: Response, next: NextFunction) {
    const { error } = cardSchemas.createCardSchema.validate(req.body)
    if (error) return res.sendStatus(422);
    next();
}

export function activateCardValidate(req: Request, res: Response, next: NextFunction) {
    const { error } = cardSchemas.activateCardSchema.validate(req.body)
    if (error) return res.sendStatus(422);
    next();
}

export function blockCardValidate(req: Request, res: Response, next: NextFunction) {
    const { error } = cardSchemas.cardBlockSchema.validate(req.body)
    if (error) return res.sendStatus(422);
    next();
}

export async function cardIdValidate(req: Request, res: Response, next: NextFunction) {
    let cardId: number = req.params.id ? parseInt(req.params.id) : req.body.cardId

    const card = await findById(cardId);
    if (!card) return res.sendStatus(404);

    res.locals.card = card;
    next();
}