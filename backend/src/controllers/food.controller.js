import uploadFile from "../services/storage.service.js";
import { v4 as uuid } from "uuid";
import foodModel from "../models/food.model.js"

async function createFood(req, res) {
  const fileUploadResult = await uploadFile(
    req.file.buffer,
    uuid()
  );

  const foodItem = await foodModel.create({
    name : req.body.name,
    description : req.body.description,
    video : fileUploadResult.url,
    foodPartner : req.foodPartner._id,
  })

  console.log(fileUploadResult);

  res.status(201).json({
    message : "Food created successfully",
    food : foodItem
  })
}

async function getFoodItems(req, res){
  const foodItems = await foodModel.find({});
  return res.status(200).json({
    message : "Food items fetched successfully",
    foodItems
  })
}

export default { createFood, getFoodItems };
