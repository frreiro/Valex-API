import { Router } from "express";
import { recharge } from "../controllers/rechargesController.js";
import { tokenValidate, cardIdValidate } from "../middlewares/cardMiddleware.js";
import { amountValidate } from "../middlewares/rechargeMiddleware.js";

const rechargesRouter = Router();

rechargesRouter.post("/recharge", tokenValidate, cardIdValidate, amountValidate, recharge);

export default rechargesRouter;