import { findById, update } from "../../repositories/cardRepository.js";
import cardServices from "./cardServices.js";

async function blockCard(cardId: number, password: string) {
    const card = await findById(cardId);

    const { expirationDate } = card
    cardServices.expirationDateValidate(expirationDate);


    const { isBlocked } = card
    cardServices.cardIsBlock(isBlocked)

    const { password: hashedPassword } = card;
    cardServices.passwordValidate(password, hashedPassword);

    await update(cardId, { isBlocked: true })
}

async function unblockCard(cardId: number, password: string) {
    const card = await findById(cardId);

    const { expirationDate } = card
    cardServices.expirationDateValidate(expirationDate);

    const { isBlocked } = card
    cardServices.cardIsNotBlock(isBlocked);

    const { password: hashedPassword } = card;
    cardServices.passwordValidate(password, hashedPassword);

    await update(cardId, { isBlocked: false })
}


export default { blockCard, unblockCard }