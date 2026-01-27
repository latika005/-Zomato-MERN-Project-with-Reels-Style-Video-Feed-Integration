import mongoose from "mongoose";

function connectDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Mongodb connected !");
    })
    .catch((err) => {
        console.log("Mongodb  connection error : ", err)
    })
}

export default connectDB;