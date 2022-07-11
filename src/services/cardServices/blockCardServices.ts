import bcrypt from 'bcrypt';
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"
dayjs.extend(customParseFormat)
import { findById, update } from "../../repositories/cardRepository.js";

async function blockCard(cardId: number, password: string) {
    const card = await findById(cardId);

    const { expirationDate } = card
    expirationDateValidate(expirationDate);

    const { isBlocked } = card
    cardIsBlock(isBlocked);

    const { password: hashedPassword } = card;
    passwordValidate(password, hashedPassword);

    await update(cardId, { isBlocked: true })
}

async function unblockCard(cardId: number, password: string) {
    const card = await findById(cardId);

    const { expirationDate } = card
    expirationDateValidate(expirationDate);

    const { isBlocked } = card
    cardIsNotBlock(isBlocked);

    const { password: hashedPassword } = card;
    passwordValidate(password, hashedPassword);

    await update(cardId, { isBlocked: false })
}


function expirationDateValidate(expirationDate: string) {
    //TODO: mesma função em activateCardMiddleware -> simplificar
    if (dayjs().isAfter(dayjs(expirationDate, "MM/YY"))) throw { type: "Unprocessable Entity" }
}

function passwordValidate(password: string, hashedPassword: string) {
    if (!bcrypt.compareSync(password, hashedPassword)) throw { type: "Unprocessable Entity" };
}

function cardIsBlock(isBlocked: boolean) {
    if (isBlocked) throw { type: "Unprocessable Entity" }
}

function cardIsNotBlock(isBlocked: boolean) {
    if (!isBlocked) throw { type: "Unprocessable Entity" }
}


export default { blockCard, unblockCard }