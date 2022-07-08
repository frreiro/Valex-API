import { Router } from "express";
import { createCard } from "../controllers/cardControllers/createCardControllers.js";
import { checkEmployeeCards, companyEmployeeValidate, companyValidate, createCardValidate } from "../middlewares/cardMiddlewares/createCardMiddleware.js";

const cardRouter = Router();

cardRouter.post("/card/create",
    createCardValidate,
    companyValidate,
    companyEmployeeValidate,
    checkEmployeeCards,
    createCard);

export default cardRouter;