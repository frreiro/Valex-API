import { Router } from "express";
import { activateCard, cardBlock, cardStatements, cardUnblock, createCard } from "../controllers/cardControllers.js";
import { activateCardValidate, blockCardValidate, createCardValidate, tokenValidate, cardIdValidate } from "../middlewares/cardMiddleware.js";

const cardRouter = Router();

cardRouter.post("/card/create", createCardValidate, tokenValidate, createCard);

cardRouter.post("/card/activate", activateCardValidate, cardIdValidate, activateCard);

cardRouter.get("/card/:id/statements", cardIdValidate, cardStatements)

cardRouter.post("/card/block", blockCardValidate, cardBlock)
cardRouter.post("/card/unblock", blockCardValidate, cardUnblock)

export default cardRouter;