import comment from "../Models/comment.js";
import {textTranslation} from "../Helper/googleTranslate.js";
import mongoose from "mongoose";

const specialChar=/[^a-zA-Z0-9\s.,?!]/;

export const postcomment = async (req, res) => {
    const commentdata = req.body
    if(specialChar.test(commentdata.commentbody)){
        return res.status(400).json({
            success:false,
            message: "Comments with special characters are not allowed."
        })
    }
    const postcomment = new comment(commentdata)
    try {
        await postcomment.save()
        res.status(200).json("posted the comment")
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}

export const getcomment = async (req, res) => {
    try {
        const commentlist = await comment.find()
        res.status(200).send(commentlist)
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}

export const deletecomment = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send("Comments unavailable..")
    }
    try {
        await comment.findByIdAndDelete(_id);
        res.status(200).json({ message: "deleted comment" })
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}

export const editcomment = async (req, res) => {
    const { id: _id } = req.params;
    const { commentbody } = req.body;
    // console.log(commentbody);
    if(specialChar.test(commentbody)){
        return res.status(400).json({
            success:false,
            message: "Comments with special characters are not allowed."
        })
    }
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send("Comments unavailable..")
    }
    try {
        const updatecomment = await comment.findByIdAndUpdate(
            _id,
            { $set: { "commentbody": commentbody } }
        )
        res.status(200).json(updatecomment)
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}

export const translatecomment = async(req,res) =>{
    try {
        const {text,targetLanguage} = req.body;
        const translatedText = await textTranslation(text,targetLanguage);
        res.status(200).json({
            success: true,
            translatedText
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Error translating text"
        })
    }
}

export const likecomment=async(req,res)=>{
    try {
        const {id,userId} = req.body;
        const Comment = await comment.findById(id);
        if(!Comment){
            return res.status(404).json({
                message: "commet .is not available"
            })
        }
        if(Comment.likedby.includes(userId)){
            return res.status(400).json({
                success:false,
                message: "user already liked this comment"
            })
        }
        if(Comment.dislikedby.includes(userId)){
            Comment.dislikedby   =  Comment.dislikedby.filter((dislikedUserId)=>dislikedUserId!==userId);
            Comment.dislikes -=1;
        }
        Comment.likedby.push(userId);
        Comment.likes +=1;
        await Comment.save();
        return res.status(200).json({
            success: true,
            message: "comment liked successfully",
        })
    } catch (error) {
        console.log("not working")
        return res.status(500).json({
            message: ("likecomment error",error.message),
        })
    }
}

export const dislikecomment=async(req,res)=>{
    try {
        const {id,userId} = req.body;
        const Comment = await comment.findById(id);
        console.log(Comment);
        if(!Comment){
            return res.status(404).send("comment is not available or deleted by the user");
        }
        if(Comment.dislikedby.includes(userId)){
            return res.status(400).send("you already disliked this comment");
        }
        if(Comment.likedby.includes(userId)){
            Comment.likedby = Comment.likedby.filter((likeUserId)=> likeUserId!==userId);
            Comment.likes -=1;
        }
        console.log(Comment.likedby);
        Comment.dislikedby.push(userId);
        Comment.dislikes+=1;
        await Comment.save();
        if (Comment.dislikes >= 2) {
            await Comment.findByIdAndDelete(Id);
            return res.status(200).json({ message: "Comment auto-deleted due to dislikes." });
          }
        return res.status(200).json({
            success: true, 
            message: "comment disliked successfully",
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error while disliking comment",
        })
    }
}