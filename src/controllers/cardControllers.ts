import { Request, Response } from 'express';
import activateCardServices from '../services/cardServices/activateCardServices.js';
import blockCardServices from '../services/cardServices/blockCardServices.js';
import createCardServices from '../services/cardServices/createCardServices.js';
import statementsCardServices from '../services/cardServices/statementsCardServices.js';


// recebe {employeeId, cardType}
export async function createCard(req: Request, res: Response) {
    const { employeeId, cardType }: { employeeId: number, cardType: 'groceries' | 'restaurant' | 'transport' | 'education' | 'health' } = req.body
    const { companyId } = res.locals;
    await createCardServices.generateCreditCard({ employeeId, companyId, cardType })
    res.sendStatus(201);
}

// receber {cardId,password,cvc}
export async function activateCard(req: Request, res: Response) {
    const { card } = res.locals;
    const { cvc, password }: { cardId: number, cvc: string, password: string } = req.body;
    await activateCardServices.insertPassword(card, password, cvc);
    res.sendStatus(200);
}

// recebe {cardId}
export async function cardStatements(req: Request, res: Response) {
    const { cardId }: { cardId: number } = req.body;
    statementsCardServices.getCardStatements(cardId)
    res.sendStatus(200)
}

// recebe {cardId, password}
export async function cardBlock(req: Request, res: Response) {
    const { cardId, password }: { cardId: number, password: string } = req.body;
    await blockCardServices.blockCard(cardId, password);
    res.sendStatus(200);
}

// recebe {cardId, password}
export async function cardUnblock(req: Request, res: Response) {
    const { cardId, password }: { cardId: number, password: string } = req.body;
    await blockCardServices.unblockCard(cardId, password);
    res.sendStatus(200);
}