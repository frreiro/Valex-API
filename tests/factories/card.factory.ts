import supertest from 'supertest';
import { connection } from './../../src/database.js';
import app from '../../src/index.js';

export async function getToken() {
    const { rows } = await connection.query("SELECT * FROM companies WHERE id = 1")
    const company = rows[0]
    return company.apiKey;
}

export function generateEmployeeAndCardType() {
    return {
        employeeId: 1,
        cardType: "restaurant"
    }
}

export async function deleteAllCards() {
    await connection.query("DELETE FROM cards")
}

export async function createCard() {
    const token = await getToken()
    console.log(token)
    const result = await supertest(app)
        .post("/card/create")
        .set("Authorization", `Bearer ${token}`)
        .send(generateEmployeeAndCardType());
    return result.body;
}
export async function findByTypeAndEmployeeId(type: string, employeeId: number) {
    const result = await connection.query(
        `SELECT * FROM cards WHERE type=$1 AND "employeeId"=$2`,
        [type, employeeId]
    );
    return result.rows[0];
}

export async function getCardId(body) {
    const card = await findByTypeAndEmployeeId(body.type, body.employeeId);
    return card.id
}

export async function createCardAndGetCVC() {
    const body = await createCard()
    const cardId = getCardId(body)
    const cvc = body.securityCode;
    return {
        cardId,
        cvc,
        password: "1234"
    }
}


export function generateCardInfo() {
    return {
        cardId: 1,
        password: "1234",
        cvc: "123"
    }
}