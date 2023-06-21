import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

export const client = new pg.Client(process.env.CONSTRING);
