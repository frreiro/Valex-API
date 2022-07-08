import { faker } from "@faker-js/faker"
import dayjs from "dayjs"
import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.ENCRYPT_KEY);


import { findById } from "../repositories/employeeRepository.js";

async function generateCreditCard(employeeId: number) {
    const number = generateCreditCardNumber();
    const cardholderName = await generateCreditCardHolderName(employeeId);
    const expirationDate = generateExpirationDate();
    const securityCode = generateEncryptCVC();

    const card = {
        employeeId,
        number,
        cardholderName,
        securityCode,
        expirationDate,
        isVirtual: false,
    };
    console.log(card)
    return card;
}

function generateCreditCardNumber(): string {
    return faker.finance.creditCardNumber("#### #### #### ####");
}

async function generateCreditCardHolderName(employeeId: number) {
    const { fullName }: { fullName: string } = await findById(employeeId);
    return fullName.split(" ")
        .filter(name => name.length > 3)
        .map((name, index, filteredNames) =>
            index === 0 || index === filteredNames.length - 1
                ? name
                : name.at(0)
        ).join(" ").toUpperCase()
}

function generateExpirationDate(): string {
    return dayjs().add(5, "y").format("MM/YY");
}

function generateEncryptCVC() {
    const cvv = faker.finance.creditCardCVV();
    const encryptedCVC = cryptr.encrypt(cvv);
    return encryptedCVC;
}

export default { generateCreditCard }