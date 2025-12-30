import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username : {
        type  : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        unique : true,
        required : true
    }
}, {
    timestamps : true,
   }
)

const userModel = mongoose.model("user", userSchema);

export default userModel;

