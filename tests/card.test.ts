import supertest from "supertest";
import app from "../src/index.js";
import { getToken, generateEmployeeAndCardType, deleteAllCards, createCardAndGetCVC } from "./factories/card.factory";

describe("authenticate testes", () => {
    it("given an empoyeeId and cardType, should create card", async () => {
        const token = await getToken()
        const result = await supertest(app)
            .post("/card/create")
            .set("Authorization", `Bearer ${token}`)
            .send(generateEmployeeAndCardType());
        await deleteAllCards()
        expect(result.statusCode).toEqual(200)
    })

    it("given an cardInfo, should activate the card", async () => {
        const cardInfo = await createCardAndGetCVC();
        const result = await supertest(app)
            .post("/card/activate")
            .send(cardInfo);
        await deleteAllCards()
        expect(result.statusCode).toEqual(200)
    })
})