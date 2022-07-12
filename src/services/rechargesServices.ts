import { insert } from "../repositories/rechargeRepository.js";
import cardServices from "./cardServices/cardServices.js";


// recebe {cardId, amount}
async function recharge(card: any, amount: number, companyId: number) {
    const { id: cardId, expirationDate, password, employeeId }: { id: number, expirationDate: string, password: string, employeeId: number } = card
    await cardServices.checkEmployeeInCompany(employeeId, companyId);
    cardServices.expirationDateValidate(expirationDate);
    cardServices.cardIsActivated(password);
    await insert({ cardId, amount });
}

export default { recharge }