import { Router } from "express";
import { createCard } from "../controllers/cardControllers.js";
import { checkEmployeeCards, companyEmployeeValidate, companyValidate, createCardValidate } from "../middlewares/cardMiddleware.js";

const cardRouter = Router();

cardRouter.post("/card/create",
    createCardValidate,
    companyValidate,
    companyEmployeeValidate,
    checkEmployeeCards,
    createCard);

export default cardRouter;