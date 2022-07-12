import { Router } from "express";
import { buyPOS } from "../controllers/purchaseControllers.js";
import { cardIdValidate, purchaseCardValidate } from "../middlewares/cardMiddleware.js";

const purchaseRouter = Router();

purchaseRouter.post("/purchase", purchaseCardValidate, cardIdValidate, buyPOS)

export default purchaseRouter;