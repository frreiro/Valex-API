import { Router } from "express";
import { activateCard, createCard } from "../controllers/cardControllers/cardControllers.js";
import { cardIdValidate } from "../middlewares/cardMiddlewares/activateCardMiddleware.js";
import { checkEmployeeCards, companyEmployeeValidate, companyValidate, createCardValidate } from "../middlewares/cardMiddlewares/createCardMiddleware.js";

const cardRouter = Router();

cardRouter.post("/card/create",
    createCardValidate,
    companyValidate,
    companyEmployeeValidate,
    checkEmployeeCards,
    createCard);

cardRouter.post("/card/activate", cardIdValidate, activateCard)

export default cardRouter;