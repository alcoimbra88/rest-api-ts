import { Pool } from "pg";

const connectionString = process.env.DB_URL;

const db = new Pool({connectionString})

export default db;