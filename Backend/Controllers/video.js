import videofile from "../Models/videofile.js";
import path from 'path';
import fs from 'fs'


export const uploadvideo=async(req,res)=>{
    if(req.file=== undefined){
        res.status(404).json({message:"plz upload a mp.4 video file only"})
    }else{
        try {
            const file=new videofile({
                videotitle:req.body.title,
                filename:req.file.originalname,
                filepath:req.file.path,
                filetype:req.file.mimetype,
                filesize:req.file.size,
                videochanel:req.body.chanel,
                uploader:req.body.uploader,
            })
            await file.save()
            res.status(200).send("File uploaded successfully")
        } catch (error) {
            res.status(404).json(error.message)
            return
        }
    }
}

export const getallvideos=async(req,res)=>{
    try {
        const files=await videofile.find();
        // console.log(files);
        res.status(200).send(files)
    } catch (error) {
        res.status(404).json(error.message)
            return
    }
}

export const download = async (req,res)=>{
    try {
        const {videoId} = req.params;
        const video = await videofile.findById(videoId);
        // console.log(video);
        if(!video){
            return res.status(404).json({
                success:false,
                message: "video is not found"
            })
        }
        const filepath = path.resolve(video.filepath);
        console.log(filepath);
        if (filepath) {
            res.download(filepath, video.videotitle);
        } else {
            res.status(404).send("File not found.");
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "problem in download video inside video.js controller"
        })
    }
}