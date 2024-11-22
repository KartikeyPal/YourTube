import React, { useEffect } from 'react'
import "./Videopage.css"
import moment from 'moment'
import Likewatchlatersavebtns from './Likewatchlatersavebtns'
import { useParams, Link } from 'react-router-dom'
import Comment from '../../Component/Comment/Comment'
import { viewvideo } from '../../action/video'
import { addtohistory } from '../../action/history'
import { useSelector,useDispatch } from 'react-redux'
import { incrementPoints } from '../../action/incrementPoints.js'
const Videopage = () => {
    const { vid } = useParams();
    const dispatch=useDispatch()
    const vids=useSelector((state)=>state.videoreducer)
    const vv = vids?.data.filter((q) => q._id === vid)[0]
   
    const currentuser = useSelector(state => state.currentuserreducer);
    // const points = useSelector(state => state.incrementPointsReducer);

    const handleviews=()=>{
        dispatch(viewvideo({id:vid}))
    }
    const handlehistory=()=>{
        dispatch(addtohistory({
            videoid:vid,
            viewer:currentuser?.result._id,
        }))
    }
    useEffect(()=>{
        if(currentuser){
            handlehistory();
        }
        handleviews()
    },[])

    const handleVideoWatched = async () => {
        console.log("this is the currentUser from showvideo component =>\n", currentuser);
        // console.log("points => " ,points);
        try {
          if(currentuser){
          const points = 5;
          dispatch(incrementPoints({
            userId: currentuser?.result._id,
            points: points
          }))}
          
        } catch (error) {
          console.error('Not able to allocate points:', error);
        }
      };
    return (
        <>
            <div className="container_videoPage">
                <div className="container2_videoPage">
                    <div className="video_display_screen_videoPage">
                        {/* <video src={`https://yourtube-0wbt.onrender.com/${vv?.filepath}`} className="video_ShowVideo_videoPage" controls></video> */}
                        <video src={`http://localhost:5000/${vv?.filepath}`} className="video_ShowVideo_videoPage" controls  onEnded={handleVideoWatched}></video>

                        <div className="video_details_videoPage">
                            <div className="video_btns_title_VideoPage_cont">
                                <p className="video_title_VideoPage">{vv?.title}</p>
                                <div className="views_date_btns_VideoPage">
                                    <div className="views_videoPage">
                                        {vv?.views} views <div className="dot"></div>{" "}
                                        {moment(vv?.createdat).fromNow()}
                                    </div>
                                    <Likewatchlatersavebtns vv={vv} vid={vid} />
                                </div>
                            </div>
                            <Link to={'/'} className='chanel_details_videoPage'>
                                <b className="chanel_logo_videoPage">
                                    <p>{vv?.uploader.charAt(0).toUpperCase()}</p>
                                </b>
                                <p className="chanel_name_videoPage">{vv.uploader}</p>
                            </Link>
                            <div className="comments_VideoPage">
                                <h2>
                                    <u>Comments</u>
                                </h2>
                                <Comment videoid={vv._id}/>
                            </div>
                        </div>
                    </div>
                    <div className="moreVideoBar">More videos</div>
                </div>
            </div>
        </>
    )
}

export default Videopage

