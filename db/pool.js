const { Pool } = require("pg");
const envFile = process.env.NODE_ENV === "production" ? ".prod.env" : ".env";
require("dotenv").config({ path: envFile });

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl:
    process.env.PGSSLMODE === "require" ? { rejectUnauthorized: false } : false,
});

module.exports = pool;
