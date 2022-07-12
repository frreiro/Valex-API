import { Router } from "express";
import { recharge } from "../controllers/rechargesController.js";
import { tokenValidate, cardIdValidate } from "../middlewares/cardMiddleware.js";
import { amountValidate } from "../middlewares/rechargeMiddleware.js";

const rechargesRouter = Router();

//TODO: validar se o funcionario pertence a empresa
rechargesRouter.post("/recharge", tokenValidate, cardIdValidate, amountValidate, recharge);

export default rechargesRouter;