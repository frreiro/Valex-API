import { Router } from "express";
import { buyPOS } from "../controllers/purchaseControllers.js";
import { cardIdValidate } from "../middlewares/activateCardMiddleware.js";

const purchaseRouter = Router();

purchaseRouter.post("/buy", cardIdValidate, buyPOS)

export default purchaseRouter;