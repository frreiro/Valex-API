import Cryptr from "cryptr";
import dotenv from "dotenv"
dotenv.config();
const cryptr = new Cryptr(process.env.ENCRYPT_KEY);

export default cryptr;