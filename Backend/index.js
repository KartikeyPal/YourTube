import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import videoroutes from './Rotues/video.js'
import userroutes from './Rotues/User.js'
import path from 'path'
import commentroutes from './Rotues/comment.js'
import upload from './Helper/filehelper.js'

dotenv.config();
const app = express();
//adding middlewares
app.use(cors());
app.use(express.json({limit:"30mb",extended: true}));
app.use(express.urlencoded({limit: "30mb",extended: true}));
app.use('/uploads', express.static('uploads'));


app.get('/',(req,res)=>{
    res.send("Your tube is working");
})


app.use(bodyParser.json());
app.use('/user',userroutes);
app.use('/video',videoroutes)
app.use('/comment',commentroutes);
const PORT =process.env.PORT || 4000


app.listen(PORT, ()=>{
    console.log(`server is running on Port no. ${PORT}`)
})
const DB_URL=process.env.DB_URL
mongoose.connect(DB_URL).then(()=>{
    console.log("Mongodb database connected")
}).catch((error)=>{
    console.log(error);
})