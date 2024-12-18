import mongoose from "mongoose";

const userschema = mongoose.Schema({

    email: { 
        type: String, 
        require: true 
    },
    name: { 
        type: String,
    },
    desc: { 
        type: String
    },
    points: { 
        type: Number, 
        default: 0 
    },
    joinedon: { 
        type: Date,
        default: Date.now 
    },
    downloadedVideos: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Videofiles" 
    }],
});

export default mongoose.model("User", userschema);
