import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const dbOption = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export async function query(query) {
  const connection = await mysql.createConnection(dbOption);
  let [rows, fields] = await connection.query(query); 
  connection.destroy();
  return rows;
}

// connection.query("SELECT * from Users", (error, rows, fields) => {
//   if (error) throw error;
//   console.log("User info is: ", rows);
// });

// connection.end();
