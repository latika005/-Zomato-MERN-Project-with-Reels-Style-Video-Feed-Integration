import express from "express"
import UserRegister from "../controllers/auth.controller.js"

const router = express.Router();

router.post("/user/register", UserRegister);

export default router;