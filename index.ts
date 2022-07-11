import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import "express-async-errors"
import cardRouter from "./src/routers/CardRouter.js";
import { errorHandler } from "./src/middlewares/errorHandlerMiddleware.js";
import rechargesRouter from "./src/routers/rechargesRouter.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cardRouter);
app.use(rechargesRouter)
app.use(errorHandler);

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})