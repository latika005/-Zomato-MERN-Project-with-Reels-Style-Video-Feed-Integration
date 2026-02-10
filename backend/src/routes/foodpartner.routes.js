import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import foodPartnerController from "../controllers/foodPartner.controller";
const router = express.Router();

router.get(":/id", 
    authMiddleware.authFoodPartnerMiddleware, 
    foodPartnerController.getFoodPartnerById);

export default router;
