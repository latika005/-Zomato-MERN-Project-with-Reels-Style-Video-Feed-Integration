import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "../src/routes/auth.routes.js";
import foodRoutes from "../src/routes/food.routes.js";



const app = express();

app.use(
    cors({
      origin: "http://localhost:5173", // or 3000 if CRA
      credentials: true,
    })
  );
app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
    res.send("Hello World !");
})

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);

export default app;