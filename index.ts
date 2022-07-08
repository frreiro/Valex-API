import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import cardRouter from "./src/routers/CardRouter.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(cardRouter);

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})