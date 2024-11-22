import mongoose from "mongoose";

const userschema=mongoose.Schema({
    email:{type:String,require:true},
    name:{type:String},
    desc:{type:String},
    points: { type: Number, default: 0 }, 
    joinedon:{type:Date,default:Date.now}
})

export default mongoose.model("User",userschema)