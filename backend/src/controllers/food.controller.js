import uploadFile from "../services/storage.service.js";
import { v4 as uuid } from "uuid";
import foodModel from "../models/food.model.js";
import likesModel from "../models/likes.model.js";
import saveModel from "../models/save.model.js";

async function createFood(req, res) {
//   console.log("req.file:", req.file);
// console.log("req.body:", req.body);

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
  res.status(200).json({
    message : "Food items fetched successfully",
    foodItems,
  })
}

async function likeFood(req, res) {
  const { foodId } = req.params.id;
  const user = req.user;

  const isAlreadyLiked = await likesModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadyLiked) {
    // UNLIKE
    await likesModel.deleteOne({
      user: user._id,
      food: foodId,
    });

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { likeCount: -1 }
    });

    return res.status(200).json({
      message: "You unliked this food item",
      liked: false
    });
  }

  // LIKE
  await likesModel.create({
    user: user._id,
    food: foodId,
  });

  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { likeCount: 1 }
  });

  return res.status(201).json({
    message: "You liked this food item",
    liked: true
  });
}

async function saveFood(req, res){
  // TODO : implement save food functionality
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadySaved = await saveModel.findOne({
    user : user._id,
    food : foodId,
  })

  if(isAlreadySaved){
    await saveModel.deleteOne({
      user : user._id,
      food : foodId,
    })
  }

    await foodModel.findByIdAndUpdate(foodId, {
      $inc : {
        saveCount : -1 
      }
    })

    const save = await saveModel.create({
      user: user._id,
      food : foodId,
    })
    await foodModel.findByIdAndUpdate(foodId, {
      $inc : {
        saveCount : +1
      }
    })

  return res.status(200).json({
    message : "You saved this food item",
    food
  })
}


export default { createFood, getFoodItems, likeFood, saveFood };
