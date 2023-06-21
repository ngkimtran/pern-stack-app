import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.PRODUCTION_DATABASE,
  ssl: true,
});

export const client = await pool.connect();
