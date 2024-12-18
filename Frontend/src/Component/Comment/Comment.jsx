import React, { useState } from 'react'
import "./Comment.css"
import Displaycommment from './Displaycomment'
import { useSelector,useDispatch  } from 'react-redux'
import { postcomment } from '../../action/comment'
import commentreducer from '../../Reducers/comment'
const Comment = ({ videoid }) => {
    const dispatch = useDispatch()
    const [commenttext, setcommentext] = useState('')
    const currentuser = useSelector(state => state.currentuserreducer);
    const commentlist = useSelector(state => state.commentreducer)
    console.log(commentlist);

    const handleonsubmit = (e) => {
        e.preventDefault();
        if (currentuser) {
            if (!commenttext) {
                alert("please type your comment!!")
            } else {
                const specialChar = /[^a-zA-Z0-9\s.,?!]/;
                if (specialChar.test(commenttext)) {
                    alert("Comments with special characters are not allowed.");
                    return;
                }
                dispatch(postcomment({
                    videoid: videoid,
                    userid: currentuser?.result._id,
                    commentbody: commenttext,
                    usercommented: currentuser.result.name
                })).catch(error=>{
                    console.error('Error posting comment=> ', error);
                });
                setcommentext("")
            }
        } else {
            alert("Please login to comment")
        }
    };

    return (
        <>
            <form className='comments_sub_form_comments' onSubmit={handleonsubmit}>
                <input 
                    type="text" 
                    onChange={(e) => setcommentext(e.target.value)} 
                    placeholder='add comment...' 
                    value={commenttext} 
                    className='comment_ibox' 
                />
                <input type="submit" value="add" className='comment_add_btn_comments' />
            </form>
            <div className="display_comment_container">
                {commentlist?.data.filter((q) => videoid === q?.videoid)
                    .reverse()
                    .map((m) => (
                    <Displaycommment 
                        key={m._id}  
                        cid={m._id} 
                        userid={m.userid} 
                        commentbody={m.commentbody} 
                        commenton={m.commenton} 
                        usercommented={m.usercommented} 
                        likes={m.likes}
                        dislikes={m.dislikes} 
                        likedby={m.likedby}
                        dislikedby={m.dislikedby}
                    />
                    ))}
            </div>
        </>
    );
};
export default Comment