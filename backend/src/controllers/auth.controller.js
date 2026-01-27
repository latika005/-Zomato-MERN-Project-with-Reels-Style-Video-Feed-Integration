import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import foodPartnerModel from "../models/foodpartner.model.js";


async function UserRegister(req, res){

    const {fullName, email, password} = req.body;

    const ifUserAlreadyExists = await userModel.findOne({
        email,
    })

    if(ifUserAlreadyExists){
        return res
        .status(400)
        .json({
            message : "Email already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password : hashedPassword,
    })

    const token = jwt.sign({
        id : user._id,
    }, process.env.JWT_SECRET);
    
    res.cookie("token", token)
    
    res.status(201).json({
        message : "User registered successfully",
        user : {
            _id : user._id,
            email : user.email,
            fullName : user.fullName
        }
    })
    
}
 
async function UserLogin(req, res){
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email,
    })

    if(!user){
        return res.status(400).json({
            message : "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message : "Password Invalid"
        })
    }

    const token = jwt.sign({
        id : user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token);

    return res.status(200).json({
        message : "User Logged In successfully",
        user : {
            _id : user._id,
            email : user.email,
            fullName : user.fullName, 
        }
    })

     

}

function LogOut(req, res){
    res.clearCookie("token");
    return res.status(200).json({
        message : "User Logged out successfully"
    })
}

async function RegisterFoodPartner(req, res){

    const { name, email, password } = req.body;

    const isFoodPartnerExists = await foodPartnerModel.findOne({
        email,
    })

    if(isFoodPartnerExists){
        return res.status(400).json({
            message : "Food-Partner already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password  :  hashedPassword
    })

    const token = jwt.sign({
        _id : foodPartner._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    return res.status(201)
    .json({
        message : "Food-Partner registered successfully",
        foodPartner : {
            _id : foodPartner._id,
            name : foodPartner.name,
            email :foodPartner.email,
        }
    })
}

async function LoginFoodPartner(req, res){

   const { email, password} = req.body;

   const foodPartner = await foodPartnerModel.findOne({
    email,
   })

   if(!foodPartner){
    res.status(400).json({
        message : "Food-Partner does not exists"
    })
   }

   const isPasswordValid = await bcrypt.compare(password, foodPartner.password)

   if(!isPasswordValid){
    return res.send(400)
    .json({
        message : "Password invalid"
    })
   }

   const token = jwt.sign({
    _id : foodPartner._id
   }, process.env.JWT_SECRET);

   res.cookie("token", token);

   return res.status(200)
   .json({
    message : "Food Partner logged in successfully",
    foodPartner : {
        name : foodPartner.name,
        email : foodPartner.email,
    }
   })

}

function LogoutFoodPartner(req, res){
    res.clearCookie("token");
    return res.status(200).json({
        message :"Food Partner logged out successfully"
    });
}

export default { UserRegister, UserLogin, LogOut , RegisterFoodPartner, LoginFoodPartner, LogoutFoodPartner};
