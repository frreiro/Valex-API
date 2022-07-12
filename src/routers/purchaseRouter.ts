import { Router } from "express";
import { buyPOS } from "../controllers/purchaseControllers.js";
import { cardIdValidate } from "../middlewares/cardMiddleware.js";

const purchaseRouter = Router();

purchaseRouter.post("/purchase", cardIdValidate, buyPOS)

export default purchaseRouter;