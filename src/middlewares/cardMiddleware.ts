import { Request, Response, NextFunction } from 'express';
import { findByTypeAndEmployeeId } from '../repositories/cardRepository.js';
import { findByApiKey } from '../repositories/companyRepository.js';
import { findById } from '../repositories/employeeRepository.js';
import cardSchemas from '../schemas/cardSchemas.js';

export async function companyValidate(req: Request, res: Response, next: NextFunction) {
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

export async function companyEmployeeValidate(req: Request, res: Response, next: NextFunction) {
    const { employeeId } = req.body;
    const { companyId } = res.locals;

    const { companyId: userCompany } = await findById(employeeId);
    if (userCompany !== companyId) return res.sendStatus(422);
    next();
}

export async function checkEmployeeCards(req: Request, res: Response, next: NextFunction) {
    const { cardType, employeeId } = req.body;

    const employeeCards = findByTypeAndEmployeeId(cardType, employeeId);
    if (employeeCards) return res.sendStatus(409);
    next();
}