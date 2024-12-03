import express from "express"

import { 
    postcomment,
    getcomment,
    deletecomment,
    editcomment,
    translatecomment,
    likecomment,
    dislikecomment,
} from "../Controllers/Comment.js"
import auth from "../middlewares/auth.js"
const router=express.Router()

router.post("/post",auth,postcomment);
router.get('/get',getcomment);
router.delete('/delete/:id',auth,deletecomment);
router.patch('/edit/:id',auth,editcomment);
router.post('/translateCmt',translatecomment);
router.patch('/likecomment',auth,likecomment);
router.patch('/dislikecomment',auth,dislikecomment);
export default router