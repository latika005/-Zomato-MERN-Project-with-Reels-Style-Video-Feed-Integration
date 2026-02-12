import express from "express";
import upload from "../services/multer.js";
import foodController from "../controllers/food.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();
  
/* POST /api/food/    [ protected ] */
router.post('/', 
    authMiddleware.authFoodPartnerMiddleware, upload.single("video"), foodController.createFood);

    /* GET /api/food/ - public (no auth required for home feed) */
router.get("/", foodController.getFoodItems);

router.post("/:id/like", 
    authMiddleware.authUsermiddleware, 
    foodController.likeFood);

router.post("/save", 
    authMiddleware.authUsermiddleware, 
    foodController.saveFood);



export default router;
