import express from "express"
import { login,incrementPoints } from "../Controllers/Auth.js"
import { updatechaneldata,getallchanels } from "../Controllers/channel.js";

const routes=express.Router();

routes.post('/login',login);
routes.patch('/update/:id',updatechaneldata);
routes.get('/getallchannel',getallchanels);
routes.post('/incrementPoints',incrementPoints);

export default routes;