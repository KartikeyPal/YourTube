import React, { useState } from "react";
import "./Comment.css";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import {
  editcomment,
  deletecomment,
  translateComment,
} from "../../action/comment";
import {languages} from '../../utilities/language' 

const Displaycommment = ({
  cid,
  commentbody,
  userid,
  commenton,
  usercommented,
}) => {
  const [edit, setedit] = useState(false);
  const [cmtbody, setcommentbdy] = useState("");
  const [cmtid, setcmntid] = useState("");
  const [TranslatedText, setTranslatedText] = useState();
  const [targetLanguage, setTargetLanguage] = useState("en");
  const dispatch = useDispatch();
  const currentuser = useSelector((state) => state.currentuserreducer);

  const handleedit = (ctid, ctbdy) => {
    setedit(true);
    setcmntid(ctid);
    setcommentbdy(ctbdy);
  };

  const haneleonsubmit = (e) => {
    e.preventDefault();
    n;
    if (!cmtbody) {
      alert("Type your comment");
    } else {
      dispatch(editcomment({ id: cmtid, commentbody: cmtbody }))
        .then(() => {
          setedit(false);
          setcommentbdy("");
        })
        .catch((error) => {
          console.error("Error editing comment:", error);
        });
    }
  };
  const handledel = (id) => {
    dispatch(deletecomment(id));
  };

  const handletranslate = async (text, targetLanguage) => {
    try {
      const translated = await translateComment(text, targetLanguage);
      setTranslatedText(translated);
    } catch (error) {
      alert("Failed to translate the comment.");
    }
  };


  return (
    <>
      {edit ? (
        <>
          <form
            className="comments_sub_form_commments"
            onSubmit={haneleonsubmit}
          >
            <input
              type="text"
              onChange={(e) => setcommentbdy(e.target.value)}
              placeholder="Edit comments.."
              value={cmtbody}
              className="comment_ibox"
            />
            <input
              type="submit"
              value="change"
              className="comment_add_btn_comments"
            />
          </form>
        </>
      ) : TranslatedText ? (
        <p className="comment_body">{TranslatedText}</p>
      ) : (
        <p className="comment_body">{commentbody}</p>
      )}
      <p className="usercommented">
        {" "}
        - {usercommented} commented {moment(commenton).fromNow()}
      </p>
      {currentuser?.result?._id === userid && (
        <div>
          <p className="EditDel_DisplayCommendt">
            <i onClick={() => handleedit(cid, commentbody)}>Edit</i>
            <i onClick={() => handledel(cid)}>Delete</i>
          </p>
          <button onClick={() => handletranslate(commentbody, targetLanguage)}>
            Translate
          </button>
          <select onChange={(e)=>setTargetLanguage(e.target.value)}>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.lang}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
};

export default Displaycommment;
