import bcrypt from "bcrypt";
import { update } from "../../repositories/cardRepository.js";
import cryptr from "../../utils/cryptr.js";
import cardServices from "./cardServices.js";

function cvcValidate(card: any, cvc: string) {
    const { securityCode }: { securityCode: string } = card;
    if (cvc.length !== 3) throw { type: "Unprocessable Entity" };
    const cvcDecrypt = cryptr.decrypt(securityCode)
    if (cvcDecrypt !== cvc) throw { type: "Unprocessable Entity" };
}


function encryptPassword(password: string) {
    if (password.length !== 4) throw { type: "Unprocessable Entity" };
    return bcrypt.hashSync(password, 10);
}

async function insertPassword(card: any, password: string, cvc: string) {
    const { id: cardId, expirationDate, password: cardPassword }:
        { id: number, expirationDate: string, password: string } = card;

    cardServices.expirationDateValidate(expirationDate);
    cardServices.cardIsNotActivated(cardPassword)

    cvcValidate(card, cvc);
    const hashedPassword = encryptPassword(password)
    await update(cardId, { password: hashedPassword })
}


export default { insertPassword }