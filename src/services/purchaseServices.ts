import { findById } from "../repositories/businessRepository.js";
import { insert } from "../repositories/paymentRepository.js";
import cardServices from "./cardServices/cardServices.js";
import statementsCardServices from "./cardServices/statementsCardServices.js";

async function setPayment(purchaseData: any, cardData: any) {
    const { password: cardPassword, expirationDate, isBlocked, password: hashedPassword, type } = cardData;
    const { cardId, businessId, amount, password } = purchaseData;
    await businessValidate(businessId);
    cardServices.cardIsActivated(cardPassword);
    cardServices.expirationDateValidate(expirationDate);
    cardServices.cardIsBlock(isBlocked);
    cardServices.passwordValidate(password, hashedPassword);
    await balaceValidate(cardId, amount);
    await businessTypeValidate(businessId, type);
    await insert({ cardId, businessId, amount })
}

async function balaceValidate(cardId: number, purchaseAmount: number) {
    const balance = await statementsCardServices.getBalanceByCardId(cardId);
    if (balance < purchaseAmount) throw { type: "Bad Request" }
}

async function businessTypeValidate(businessId: number, cardType: string) {
    const { type } = await findById(businessId);
    if (type !== cardType) throw { type: "Unprocessable Entity" };
}

async function businessValidate(businessId: number) {
    const business = await findById(businessId);
    if (!business) throw { type: "Unprocessable Entity" };
}


export default { setPayment };