import { Router } from "express";
import { recharge } from "../controllers/rechargesController.js";
import { tokenValidate, cardIdValidate, rechargeCardValidate } from "../middlewares/cardMiddleware.js";
import { amountValidate } from "../middlewares/rechargeMiddleware.js";

const rechargesRouter = Router();

rechargesRouter.post("/recharge", tokenValidate, rechargeCardValidate, cardIdValidate, amountValidate, recharge);

export default rechargesRouter;