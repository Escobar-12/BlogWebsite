import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    role:
    {
        type:[Number],
        default:[2000]
    },
    img:
    {
        type:String
    },
    desc:
    {
        type:String,
        required:true
    },
    savedPosts:{
        type:[String],
        default:[]
    },
    
},{timestamps:true})

export const userModel = mongoose.models.UserInfo || mongoose.model("UserInfo",userSchema);