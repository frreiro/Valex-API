import cryptr from "../../utils/cryptr.js"
import bcrypt from "bcrypt";
import { update } from "../../repositories/cardRepository.js";

async function cvcValidate(card: any, cvc: string) {
    const { securityCode }: { securityCode: string } = card;
    // console.log(securityCode)

    // const teste1 = cryptr.encrypt("lucas");
    // const teste2 = cryptr.decrypt(securityCode);
    // console.log(teste1)
    // console.log(teste2)

}


function encryptPassword(password: string) {
    if (password.length !== 4) throw { type: "Unprocessable Entity" };
    return bcrypt.hashSync(password, 10);
}

async function insertPassword(password: string, cardId: number) {
    const hashedPassword = encryptPassword(password)
    await update(cardId, { password: hashedPassword })
}


export default { cvcValidate, insertPassword }