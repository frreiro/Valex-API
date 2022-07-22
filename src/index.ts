import express from "express"
import "express-async-errors"
import dotenv from "dotenv";
import cors from "cors"
import cardRouter from "./routers/cardRouter.js"
import { errorHandler } from "./middlewares/errorHandlerMiddleware.js";
import rechargesRouter from "./routers/rechargesRouter.js";
import purchaseRouter from "./routers/purchaseRouter.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(rechargesRouter)
app.use(cardRouter);
app.use(purchaseRouter);
app.use(errorHandler);

export default app