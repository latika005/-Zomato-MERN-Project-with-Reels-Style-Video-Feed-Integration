import express from "express";
import dotenv from "dotenv";
import router from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser();)

app.get("/", (req, res) => {
    res.send("Hello World !");
})

export default app;