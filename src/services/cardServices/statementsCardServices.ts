import { findByCardId as findRechargesByCardId } from "../../repositories/rechargeRepository.js";
import { findByCardId as findPaymentByCardId } from "../../repositories/paymentRepository.js";


async function getCardStatements(cardId: number) {
    const recharges = await findRechargesByCardId(cardId);
    const payments = await findPaymentByCardId(cardId);
    const balance = getBalance({ recharges, payments })
    return { balance, transactions: payments, recharges }
}

function getBalance(transactios: any) {
    const { recharges, payments } = transactios;
    const totalRecharges: number = getTotalAmount(recharges);
    const totalPayments: number = getTotalAmount(payments);
    return (totalPayments - totalRecharges);
}

function getTotalAmount(objectArray: Array<Object>): number {
    return objectArray.reduce((sum: number, object: any) => sum + object.amount, 0);
}
export default { getCardStatements }