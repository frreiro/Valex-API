import joi from "joi";

const createCardSchema = joi.object({
    employeeId: joi.number().integer().required(),
    cardType: joi.string().valid('groceries', 'restaurant', 'transport', 'education', 'health').required()
})

const activateCardSchema = joi.object({
    cardId: joi.number().integer().required(),
    cvc: joi.number().integer().required(),
    password: joi.string().required()
})

const cardStatementsSchema = joi.object({
    cardId: joi.number().integer().required()
})

const cardBlockSchema = joi.object({
    cardId: joi.number().integer().required(),
    password: joi.string().required()
})
export default { createCardSchema, activateCardSchema, cardStatementsSchema, cardBlockSchema }