import joi from "joi";

const createCardSchema = joi.object({
    employeeId: joi.number().integer().required(),
    cardType: joi.string().valid('groceries', 'restaurant', 'transport', 'education', 'health').required()
})

const activateCardSchema = joi.object({
    cardId: joi.number().integer().required(),
    cvc: joi.number().integer().required(),
    password: joi.string().length(4).required()
})

const cardStatementsSchema = joi.object({
    cardId: joi.number().integer().required()
})

const cardBlockSchema = joi.object({
    cardId: joi.number().integer().required(),
    password: joi.string().length(4).required()
})

const cardRechargeSchema = joi.object({
    cardId: joi.number().integer().required(),
    amount: joi.number().integer().min(1).required()
})

const purchaseSchema = joi.object({
    cardId: joi.number().integer().required(),
    businessId: joi.number().integer().required(),
    password: joi.string().length(4).required(),
    amount: joi.number().integer().min(1).required()
})

export default {
    createCardSchema,
    activateCardSchema,
    cardStatementsSchema,
    cardBlockSchema,
    purchaseSchema,
    cardRechargeSchema
}