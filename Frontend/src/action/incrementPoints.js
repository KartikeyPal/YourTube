import * as api from '../Api'
import { setcurrentuser } from './currentuser';


export const incrementPoints = (userId,points) =>async(dispatch) =>{
    try {
        const {data} = await api.incrementPoints(userId,points);
        dispatch({type: "UPDATE_POINTS",payload:data});
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem('Profile'))));
    } catch (error) {
        console.log("error in increment points",error);
    }
}