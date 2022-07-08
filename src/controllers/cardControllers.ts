import { Request, Response } from 'express';
import cardServices from '../services/cardServices.js';

//TODO: Validar header => x-api-key
//Para criar um cartão a empresa precisa:
// [] Validar a entrada do JSON
// [x] Ter uma API-KEY válida -> Middleware
// [x] Id do empregado -> Passado pelo body
// [x] Tipo do cartão -> Passado pelo body
// [x] Gerar numero do cartão -> Services
// [x] Criar nome do cartão -> Services
// [x] Criar data de expiração do cartão -> Services
// [x] Criar código CVC do cartão -> Services



export async function createCard(req: Request, res: Response) {
    const { employeeId, cardType }: { employeeId: number, cardType: string } = req.body
    const card = await cardServices.generateCreditCard(employeeId)

    // const card = {
    //     employeeId,
    //     number,
    //     cardholderName,
    //     securityCode,
    //     expirationDate,
    //     passwor,
    //     isVirtual: false,
    //     originalCardId,
    //     isBlocked,
    //     cardType,
    //   };
    // console.log(securityCode)
    res.send({ employeeId, cardType }).status(200);

}