import dotenv from "dotenv";
import pg from "pg";
dotenv.config();

const { Pool } = pg;

const pool = process.env.MODE === "PROD" ? {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
} :
  {
    connectionString: process.env.DATABASE_URL,
  }
export const connection = new Pool(pool);


