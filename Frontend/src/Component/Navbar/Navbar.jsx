import React, { useState, useEffect } from 'react'
import logo from "./logo.ico"
import "./Navbar.css"
import { useDispatch, useSelector } from 'react-redux'
import { Link} from "react-router-dom"
import { RiVideoAddLine } from "react-icons/ri"
import { IoMdNotificationsOutline } from "react-icons/io"
import { BiUserCircle } from "react-icons/bi"
import Searchbar from './Searchbar/Searchbar'
import Auth from '../../Pages/Auth/Auth'
import axios from "axios"
import { login } from "../../action/auth"
import { useGoogleLogin,googleLogout } from '@react-oauth/google';
import { setcurrentuser } from '../../action/currentuser';
import {jwtDecode} from "jwt-decode"

const Navbar = ({ toggledrawer, seteditcreatechanelbtn }) => {
    const [authbtn, setauthbtn] = useState(false)
    const [user, setuser] = useState(null)
    const [profile, setprofile] = useState(null)
    const dispatch = useDispatch()
    const currentuser = useSelector(state => state.currentuserreducer);
    
    const successlogin = () => {
        if (profile && profile.email) {
            dispatch(login({ email: profile.email }))
        }
    }

    const google_login = useGoogleLogin({
        onSuccess: tokenResponse => {
            setuser(tokenResponse)
        },
        onError: (error) => console.log("Login Failed", error)
    });
    
    useEffect(() => {
        const fetchUserProfile = async() =>{
        if (user && user.access_token) {
            try {
                const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                     headers: {
                         Authorization: `Bearer ${user.access_token}`,
                         Accept: 'application/json'
                     }
                 })
                setprofile(res.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        }
    }
    fetchUserProfile();
    },[user]);

    useEffect(() => {
        if (profile) {
            successlogin();
        }
    }, [profile]);
    
    const logout = () => {
        dispatch(setcurrentuser(null));
        googleLogout();
        localStorage.clear();
        console.log("User logged out successfully");
    };
    
    useEffect(()=>{
        const token=currentuser?.token;
        if(token){
            const decodetoken=jwtDecode(token)
            if(decodetoken.exp *1000 <new Date().getTime()){
                logout()
            }
        }
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))))
    },[currentuser?.token,dispatch]
)
return (
    <>
            <div className="Container_Navbar">
                <div className="Burger_Logo_Navbar">
                    <div className="burger" onClick={() => toggledrawer()}>
                        <p></p>
                        <p></p>
                        <p></p>
                    </div>
                    <Link to={"/"} className='logo_div_Navbar'>
                        <img src={logo} alt="text" />
                        <p className="logo_title_navbar">Your-Tube</p>
                    </Link>
                </div>
                <Searchbar />
                <RiVideoAddLine size={22} className={"vid_bell_Navbar"} />
                <div className="apps_Box">
                    <p className="appBox"></p>
                    <p className="appBox"></p>
                    <p className="appBox"></p>
                    <p className="appBox"></p>
                    <p className="appBox"></p>
                    <p className="appBox"></p>
                    <p className="appBox"></p>
                    <p className="appBox"></p>
                    <p className="appBox"></p>
                </div>

                <IoMdNotificationsOutline size={22} className={"vid_bell_Navbar"} />
                <div className="Auth_cont_Navbar">
                    {currentuser ? (
                        <>
                            <div className="Chanel_logo_App" onClick={() => setauthbtn(true)}>
                                <p className="fstChar_logo_App">
                                    {currentuser?.result.name ? (
                                        <>{currentuser?.result.name.charAt(0).toUpperCase()}</>
                                        
                                    ) : (
                                        <>{currentuser?.result.email.charAt(0).toUpperCase()}</>
                                    )}
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className='Auth_Btn' onClick={() => google_login()}>
                                <BiUserCircle size={22} />
                                <b>Sign in</b>
                            </p>
                        </>
                    )}
                </div>
            </div>
            {
                authbtn &&
                <Auth seteditcreatechanelbtn={seteditcreatechanelbtn} setauthbtn={setauthbtn} user={currentuser} />
            }
        </>
    )
}

export default Navbar



// `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`
//  // Scope => email profile https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email