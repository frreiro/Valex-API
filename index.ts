import express from "express"
import "express-async-errors"
import dotenv from "dotenv";
import cors from "cors"
import cardRouter from "./src/routers/cardRouter.js"
import { errorHandler } from "./src/middlewares/errorHandlerMiddleware.js";
import rechargesRouter from "./src/routers/rechargesRouter.js";
import purchaseRouter from "./src/routers/purchaseRouter.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(rechargesRouter)
app.use(cardRouter);
app.use(purchaseRouter);
app.use(errorHandler);

const port = +process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})