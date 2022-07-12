import { Router } from "express";
import { recharge } from "../controllers/rechargesController.js";
import { cardIdValidate } from "../middlewares/activateCardMiddleware.js";
import { tokenValidate } from "../middlewares/createCardMiddleware.js";
import { amountValidate } from "../middlewares/rechargeMiddleware.js";

const rechargesRouter = Router();

//TODO: validar se o funcionario pertence a empresa
rechargesRouter.post("/recharge", tokenValidate, cardIdValidate, amountValidate, recharge);

export default rechargesRouter;