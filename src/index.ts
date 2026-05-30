import "reflect-metadata";
import express, { type Request, type Response } from 'express';
import webRouter from "./routers/web.router.ts";
import apiRouter from "./routers/api.router.ts";
import dotenv from "dotenv";
import AppDataSource from "./database/datasource.ts";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from 'cookie-parser';

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

// session
app.use(session({
  secret: '123456789abcvsss', // Used to sign the session ID cookie
  resave: false,             // Don't save session if unmodified
  saveUninitialized: false,  // Don't create session until something stored
  cookie: { secure: false }  // Set to true if using HTTPS
}));

// Initialize the middleware
app.use(cookieParser());

app.use("/api", apiRouter)

app.use("/", webRouter)

AppDataSource.initialize().then(() => {
  console.log("Database connected");
}).catch((error) => {
  console.log("Database connection failed", error);
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
