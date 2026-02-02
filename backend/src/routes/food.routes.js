import express from "express";
import multer from "multer";
import foodController from "../controllers/food.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

const upload = multer({
    storage : multer.memoryStorage(),
})

/* POST /api/food/    [ protected ] */
router.post('/', 
    authMiddleware.authFoodPartnerMiddleware, 
    upload.single("video"),
    foodController.createFood);

    /* GET /api/food/ [protected]   */ 
router.get("/", 
    authMiddleware.authUseriddleware, 
    foodController.getFoodItems);


export default router;
