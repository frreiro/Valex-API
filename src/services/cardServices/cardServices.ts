import bcrypt from 'bcrypt';
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"
import { findByTypeAndEmployeeId } from '../../repositories/cardRepository';
import { findById } from '../../repositories/employeeRepository';
dayjs.extend(customParseFormat)

function expirationDateValidate(expirationDate: string) {
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

async function cardIsActivated(cardPassword: string) {
    if (cardPassword) throw { type: "Unprocessable Entity" }
}

async function checkEmployeeInCompany(employeeId: number, companyId: number) {
    const { companyId: employeeCompany } = await findById(employeeId);
    if (employeeCompany !== companyId) throw { type: "Unprocessable Entity" }
}

async function checkEmployeeCards(cardType: 'groceries' | 'restaurant' | 'transport' | 'education' | 'health', employeeId: number) {
    const employeeCards = await findByTypeAndEmployeeId(cardType, employeeId);
    if (employeeCards) throw { type: "Conflict" }
}

async function cardIsPassword(password: string) {
    if (password) throw { type: "Conflict" }
}


export default {
    expirationDateValidate,
    passwordValidate,
    cardIsBlock,
    cardIsNotBlock,
    cardIsActivated,
    checkEmployeeInCompany,
    checkEmployeeCards,
    cardIsPassword
}