import React from 'react'
import "./Showvideogrid.css"
import Showvideo from '../Showvideo/Showvideo'
import { useDispatch, useSelector } from 'react-redux'
const Showvideogrid = ({vid}) => {
    const currentuser=useSelector(state => state.currentuserreducer);
    const dispatch = useDispatch();
  return (
    <div className="Container_ShowVideoGrid">
        {
            vid?.reverse().map(vi=>{
                return(
                    <div  key={vi._id} className="video_box_app">
                        <Showvideo vid={vi} currentuser={currentuser} />
                    </div>
                )
            })
        }
    </div>
  )
}

export default Showvideogrid