import axios from "axios"
const API=axios.create({baseURL:`http://localhost:5000/`})
// const API=axios.create({baseURL:`https://yourtube-0wbt.onrender.com`});


API.interceptors.request.use((req)=>{
    if(localStorage.getItem("Profile")){
        req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem("Profile")).token}`
    }
    return req;
})

// Interation with api routes 

//chanel routes

export const login=(authdata)=>API.post("/user/login",authdata);
export const updatechaneldata=(id,updatedata)=>API.patch(`/user/update/${id}`,updatedata)
export const fetchallchannel=()=>API.get("/user/getallchannel");

//Video routes

export const uploadvideo=(filedata,fileoption)=>API.post("/video/uploadvideo",filedata,fileoption)
export const getvideos=()=>API.get("/video/getvideos");
export const likevideo=(id,Like)=>API.patch(`/video/like/${id}`,{Like});
export const viewsvideo=(id)=>API.patch(`/video/view/${id}`);

//Comment Routes

export const postcomment=(commentdata)=>API.post('/comment/post',commentdata)
export const deletecomment=(id)=>API.delete(`/comment/delete/${id}`)
export const editcomment=(id,commentbody)=>API.patch(`/comment/edit/${id}`,{commentbody})
export const getallcomment=()=>API.get('/comment/get')
export const translatecomment =(data)=>API.post('/comment/translateCmt',data);

// History routes
export const addtohistory=(historydata)=>API.post("/video/history",historydata)
export const getallhistory=()=>API.get('/video/getallhistory')
export const deletehistory=(userid)=>API.delete(`/video/deletehistory/${userid}`)

//Like video routes
export const addtolikevideo=(likedvideodata)=>API.post('/video/likevideo',likedvideodata)
export const getalllikedvideo=()=>API.get('/video/getalllikevide')
export const deletelikedvideo=(videoid,viewer)=>API.delete(`/video/deletelikevideo/${videoid}/${viewer}`)

//watch later routes
export const addtowatchlater=(watchlaterdata)=>API.post('/video/watchlater',watchlaterdata)
export const getallwatchlater=()=>API.get('/video/getallwatchlater')
export const deletewatchlater=(videoid,viewer)=>API.delete(`/video/deletewatchlater/${videoid}/${viewer}`)

//Points routes
export const incrementPoints = (userid,points) => API.post('/user/incrementPoints',userid,points);