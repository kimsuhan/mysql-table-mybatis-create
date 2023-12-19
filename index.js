import express from "express";
import path from "path";
import dotenv from "dotenv";
import { query } from "./src/config/db.js";
import jsonwebtoken from "jsonwebtoken";


const app = express();
const __dirname = path.resolve();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/token", async (req, res) => {
  const result = await query(`SELECT TABLE_NAME, COLUMN_NAME, COLUMN_COMMENT FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'CRM_DB' ORDER BY TABLE_NAME, ORDINAL_POSITION`);

  res.render("token", {data:result});
});

app.get("/tables", async (req, res) => {
  const result = await query(`SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '${process.env.DB_USER}'`);
  res.render("tables", { data: result });
});

app.get("/tables/:table_name", async (req, res) => {
  const result = await query( `SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '${process.env.DB_USER}' AND TABLE_NAME = '${req.params.table_name}'`);
  console.log(result);
  res.render("table_column", {
    data: result,
    table_name: req.params.table_name,
  });
});

dotenv.config();
app.listen(process.env.PORT, () => { 
  console.log(`Server is running on port ${process.env.PORT}`);
});
