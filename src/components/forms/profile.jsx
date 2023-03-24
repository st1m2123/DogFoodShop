import React, { useEffect, useState } from "react";
import s from './forms.module.css'
import api from "../../utils/api";
import Button from "../Button/button";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    
    const userInfo = useEffect( () => {
       api.getUserInfo().then(result => {
        setUser(result)
        console.log(user);
    }
    )
    }, [])

    const handleSignOut = () =>{
        localStorage.removeItem('token');
        setUser(undefined)
        navigate('/')
    }
return(
    <div className={s.windowForm}>
            <h3>Профиль</h3>
            { user === undefined ? null : <>
            <p>Ваше имя: {user.name}</p>
            <p>Ваш Email: {user.email}</p>
            <p>Ваша группа: {user.group}</p>
            </> }
            <a onClick={handleSignOut} className={s.submitBtn}>Выйти</a> 
    </div>

)
};

export default Profile;