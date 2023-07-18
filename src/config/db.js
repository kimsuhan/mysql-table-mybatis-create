import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();
export const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_USER,
});


// export function dbConnect() {
//   const connection = mysql.createConnection({
//     host: "localhost",
//     user: "< MySQL username >",
//     password: "< MySQL password >",
//     database: "my_db",
//   });

//   connection.connect();
// }

// connection.query("SELECT * from Users", (error, rows, fields) => {
//   if (error) throw error;
//   console.log("User info is: ", rows);
// });

// connection.end();
