import express from "express"
import authController from "../controllers/auth.controller.js"

const router = express.Router();

router.post("/user/register", authController.UserRegister);
router.post("/user/login", authController.UserLogin);
router.get("/user/logout", authController.LogOut);

router.post("/foodpartner/register", authController.RegisterFoodPartner);
router.post("/foodpartner/login", authController.LoginFoodPartner);
router.get("/foodpartner/logout", authController.LogoutFoodPartner);
router.get("/foodpartner/:id", authController.GetFoodPartnerProfile);



export default router;