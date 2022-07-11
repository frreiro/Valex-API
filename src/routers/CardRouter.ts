import { Router } from "express";
import { activateCard, cardBlock, cardStatements, cardUnblock, createCard } from "../controllers/cardControllers/cardControllers.js";
import { cardIdValidate, experationDateValidate, passwordValidate } from "../middlewares/cardMiddlewares/activateCardMiddleware.js";
import { checkEmployeeCards, companyEmployeeValidate, companyValidate, createCardValidate } from "../middlewares/cardMiddlewares/createCardMiddleware.js";

const cardRouter = Router();

cardRouter.post("/card/create",
    createCardValidate,
    companyValidate,
    companyEmployeeValidate,
    checkEmployeeCards,
    createCard);

cardRouter.post("/card/activate", cardIdValidate, experationDateValidate, passwordValidate, activateCard);

//TODO: alterar para params quando aprender interface e endpoint para get
cardRouter.post("/card/statements", cardIdValidate, cardStatements)

cardRouter.post("/card/block", cardBlock)
cardRouter.post("/card/unblock", cardUnblock)

export default cardRouter;