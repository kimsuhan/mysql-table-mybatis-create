import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.DB_HOST);
const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function query(query) {
  let [rows, fields] = await connection.query(query); 
  return rows;
}

// connection.query("SELECT * from Users", (error, rows, fields) => {
//   if (error) throw error;
//   console.log("User info is: ", rows);
// });

// connection.end();
