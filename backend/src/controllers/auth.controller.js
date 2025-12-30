import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";


async function UserRegister(req, res){

    const {username, email, password} = req.body;

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
        username,
        email,
        password : hashedPassword,
    })
}

export default UserRegister;