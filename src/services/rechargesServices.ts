import { insert } from "../repositories/rechargeRepository.js";
import cardServices from "./cardServices/cardServices.js";


// recebe {cardId, amount}
async function recharge(card: any, amount: number) {
    const { id: cardId, expirationDate, password }: { id: number, expirationDate: string, password: string } = card
    cardServices.expirationDateValidate(expirationDate);
    cardServices.cardIsActivated(password);
    await insert({ cardId, amount });
}



export default { recharge }