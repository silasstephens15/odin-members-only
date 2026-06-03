const { Pool } = require("pg");

let pool;

if (process.env.DEV == "true") {
  pool = new Pool({
    host: "localhost",
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  });
} else {
  pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
  });
}

module.exports = { pool };
