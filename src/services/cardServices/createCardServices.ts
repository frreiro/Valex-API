import { faker } from "@faker-js/faker"
import dayjs from "dayjs"
import cryptr from "../../utils/cryptr.js";
import { findById } from "../../repositories/employeeRepository.js";
import { insert } from "../../repositories/cardRepository.js";
import cardServices from "./cardServices.js";

async function generateCreditCard(data: any) {
    await checkValidates(data);
    const { employeeId, cardType: type } = data
    const number = generateCreditCardNumber();
    const cardholderName = await generateCreditCardHolderName(employeeId);
    const expirationDate = generateExpirationDate();
    const cvv = faker.finance.creditCardCVV();
    const securityCode = generateEncryptCVC(cvv);

    const card = {
        employeeId,
        number,
        cardholderName,
        securityCode,
        expirationDate,
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: false,
        type,
    };

    await insert(card)
    return { ...card, securityCode: cvv };
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

function generateEncryptCVC(cvv: string) {
    const encryptedCVC = cryptr.encrypt(cvv);
    return encryptedCVC;
}

async function checkValidates({ employeeId, companyId, cardType }) {
    await cardServices.checkEmployeeInCompany(employeeId, companyId);
    await cardServices.checkEmployeeCards(cardType, employeeId)
}

export default { generateCreditCard, checkValidates }