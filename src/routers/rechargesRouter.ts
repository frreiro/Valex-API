import { Router } from "express";
import { recharge } from "../controllers/cardControllers/rechargesController.js";
import { tokenValidate } from "../middlewares/cardMiddlewares/createCardMiddleware.js";
import { amountValidate } from "../middlewares/rechargeMiddleware.js";

const rechargesRouter = Router();

rechargesRouter.post("/recharge", tokenValidate, amountValidate, recharge)

export default rechargesRouter;