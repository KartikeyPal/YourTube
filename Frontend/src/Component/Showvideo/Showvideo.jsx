import React from 'react'
import './Showvideo.css'
import { Link } from 'react-router-dom'
import moment from "moment"
const Showvideo = ({vid}) => {
  // http://localhost:5000/uploads/2024-11-20T12-16-09.082Z-2022-08-13T17-41-00.010Z-VC_220716125804.mp4
  // console.log(`http://localhost:5000/${vid.filepath}`);
  // https://yourtube-0wbt.onrender.com
  // console.log(`https://yourtube-0wbt.onrender.com/${vid.filepath}`);

  // 
  return (
        <>
      <Link to={`/videopage/${vid._id}`}>
        
        <video src={`https://yourtube-0wbt.onrender.com/${vid.filepath}`} className='video_ShowVideo' controls/>
    </Link>
    <div className="video_description">
        <div className="Chanel_logo_App">
            <div className="fstChar_logo_App">
            <>{vid?.uploader?.charAt(0).toUpperCase()}</>
            </div>
        </div>
    
    <div className="video_details">
        <p className="title_vid_ShowVideo">{vid?.videotitle}</p>
        <pre className="vid_views_UploadTime">{vid?.uploader}</pre>
        <pre className="vid_views_UploadTime">
            {vid?.views} views <div className="dot"></div>{moment(vid?.createdat).fromNow()}
        </pre>
    </div>
    </div>
    </>
  )
}

export default Showvideo