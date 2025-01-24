import * as api from "../Api";

export const editcomment=(commentdata)=>async(dispatch)=>{
    try {
        const {id,commentbody}=commentdata;
        const {data}=await api.editcomment(id,commentbody);
        dispatch({type:"EDIT_COMMENT",payload:data});
        dispatch(getallcomment());
    } catch (error) {
        console.log(error);
    }
}

export const postcomment=(commentdata)=>async(dispatch)=>{
    try {
        const {data}=await api.postcomment(commentdata);
        dispatch({type:"POST_COMMENT",payload:data});
        dispatch(getallcomment());
    } catch (error) {
        console.log(error);
    }
}
export const getallcomment=()=>async(dispatch)=>{
    try {
        const {data}=await api.getallcomment();
        dispatch({type:"FETCH_ALL_COMMENTS",payload:data})
    } catch (error) {
        console.log(error);
    }
}

export const deletecomment=(id)=>async(dispatch)=>{
    try {
        await api.deletecomment(id);
        dispatch(getallcomment());
    } catch (error) {
        console.log(error);
    }
}

export const translateComment=async(text,targetLanguage)=>{
    try {
        const response = await api.translatecomment({text,targetLanguage});
        return response.data.translatedText; 
    } catch (error) {
        console.error("Translation API error:", error);
        throw(error);
    }
};

export const likecomment=(id,userId)=>async(dispatch)=>{
    // console.log(id,userId)
    try {
        await api.likecomment({id,userId});
        dispatch(getallcomment());
    } catch (error) {
        console.log("erroe in like comment");
        console.log(error);
    }
}

export const dislikecomment =(id, userId) => async(dispatch)=>{
    try {
        await api.dislikecomment({id,userId});
        dispatch(getallcomment());
    } catch (error) {
        console.log("error in dislike comment")
        console.log(error);
    }
}