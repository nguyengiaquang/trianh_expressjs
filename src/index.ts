import "reflect-metadata";
import express, { type Request, type Response } from 'express';
import webRouter from "./routers/web.router.ts";
import apiRouter from "./routers/api.router.ts";
import dotenv from "dotenv";
import AppDataSource from "./database/datasource.ts";
import bodyParser from "body-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// config view engine
app.set("view engine", "ejs")
app.set("views", "src/views")

// config body-parser
// Parse application/json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", webRouter)
app.use("/api", apiRouter)

AppDataSource.initialize().then(() => {
  console.log("Database connected");
}).catch((error) => {
  console.log("Database connection failed", error);
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
