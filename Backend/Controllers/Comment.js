import comment from "../Models/comment.js";
import {textTranslation} from "../Helper/googleTranslate.js";
import mongoose from "mongoose";

export const postcomment = async (req, res) => {
    const commentdata = req.body
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