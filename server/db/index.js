import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool();

export const query = (text, params) => pool.query(text, params);
