import { Request, Response, NextFunction } from 'express';
import { findByApiKey } from '../repositories/companyRepository.js';
import cardSchemas from '../schemas/cardSchemas.js';

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
