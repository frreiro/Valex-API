import { Request, Response } from 'express';
import activateCardServices from '../../services/cardServices/activateCardServices.js';
import cardServices from '../../services/cardServices/createCardServices.js';
import cryptr from '../../utils/cryptr.js';

export async function createCard(req: Request, res: Response) {
    const { employeeId, cardType }: { employeeId: number, cardType: 'groceries' | 'restaurant' | 'transport' | 'education' | 'health' } = req.body
    await cardServices.generateCreditCard(employeeId, cardType)
    res.sendStatus(201);
}

// [x]Somente cartões cadastrados devem ser ativados -> middle
// [x]Somente cartões não expirados devem ser ativados -> middle
// [x]Cartões já ativados (com senha cadastrada) não devem poder ser ativados de novo -> services
// [x]A senha do cartão deverá ser composta de 4 números ->  middle
// [x]A senha do cartão deverá ser persistida de forma criptografada por ser um dado sensível -> services
// []O CVC deverá ser recebido e verificado para garantir a segurança da requisição -> middle -> problema cryptr

//TODO: verificar o cryptr, problema na hora de descriptografar
export async function activateCard(req: Request, res: Response) {
    const { cardId, cvc, password }: { cardId: number, cvc: string, password: string } = req.body;
    activateCardServices.insertPassword(password, cardId);
    res.sendStatus(200);
}