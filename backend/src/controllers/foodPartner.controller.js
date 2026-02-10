import foodPartnerModel from "../models/foodpartner.model";
import foodModel from "../models/food.model";

async function getFoodPartnerById(req, res){

    const foodPartnerId = req.params.id;

    const foodPartner = await foodPartnerModel.findById(foodPartnerId);
    const foodItemsByFoodPartner = await foodModel.find({ foodPartner: foodPartnerId });

    if(!foodPartner){
        return res.status(404).json({ message : "Food Partner not found "});
    }

    res.status(200).json({
        message : "Food Partner retrieved successfully",
        foodPartner : {
            ...foodPartner.toObject(),
            foodItems : foodItemsByFoodPartner
        }
    })

}



export default getFoodPartnerById;