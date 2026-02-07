import foodPartnerModel from "../models/foodpartner.model.js";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

async function authFoodPartnerMiddleware(req, res, next){

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message : "Please login first"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const foodPartner = await foodPartnerModel.findById(decoded._id);

        req.foodPartner = foodPartner;
        
        next();

    }catch(err){
        return res.status(401).json({
            message : "Invalid Token"
        })
    }
}

async function authUsermiddleware(req, res, next){

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message : "Please login first"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.id)

        req.user = user;

        next();
        
    }catch(err){
        return res.status(401).json({
            message : "Invalid Token"
        })
    }
}

export default {   authFoodPartnerMiddleware , authUsermiddleware  };

