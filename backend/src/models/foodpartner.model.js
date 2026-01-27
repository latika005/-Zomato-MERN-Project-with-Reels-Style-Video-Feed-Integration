import mongoose from 'mongoose';

const FoodPartnerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },

}, {
    timestamps: true
})

const foodPartnerModel = mongoose.model("foodpartner", FoodPartnerSchema);

export default foodPartnerModel;

