import express from "express";
import path from "path";
import dotenv from "dotenv";
import { connection } from "./src/config/db.js";


dotenv.config();
const app = express();
const __dirname = path.resolve();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.get("/", (req, res) => {
  res.render("index");
});

/**
 *
 */
app.get("/tables", (req, res) => {
  connection.query(
    `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '${process.env.DB_USER}'`,
    (error, rows, fields) => {
      if (error) throw error;
      res.render("tables", { data: rows });
    }
  );
});

/**
 *
 */
app.get("/tables/:table_name", (req, res) => {
  connection.query(
    `SELECT COLUMN_NAME, IS_NULLABLE, COLUMN_DEFAULT, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, COLUMN_COMMENT FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '${process.env.DB_USER}' AND TABLE_NAME = '${req.params.table_name}'`,
    (error, rows, fields) => {
      if (error) throw error;
      res.render("table_column", {
        data: rows,
        table_name: req.params.table_name,
      });
    }
  );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
