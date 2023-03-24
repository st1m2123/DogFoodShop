import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import s from "./forms.module.css";
import Api from '../../utils/api'
import Button from "../Button/button";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const Login = ({linkState}) => {
    const [userInfo, setUserInfo] = useState();
    
    const {token, setToken} = useContext(UserContext);

    const {register, handleSubmit, formState: {errors} } = useForm();

    const navigate = useNavigate();

    const onSubmit = (data) => {
        setUserInfo(data);
        handleLogIn(data);
        setToken(localStorage.getItem('token'))
        if (localStorage.getItem('token') !== null){
            navigate('/');
        }
        // data.preventDefault();
    }
    const handleLogIn = (userInfo) => {
        Api.Login(userInfo)
    }
    

    return (
<>
<div className={s.windowForm}>
<a className={s.closeBtn} >X</a>
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
<h3>Вход</h3>
            <input 
            {...register('email')}
            type="text"
            placeholder="Email" 
            />
            <input 
            {...register('password' )}
            type="password" 
            placeholder="Пароль"
            />
            <Button look='primary' >Войти</Button>
            <Button look="secondary" href='/registration' linkState={linkState}>Зарегистрироваться</Button>
</form>
<div>
    {errors && errors.password ? <p>{errors.password.message}</p> : null}
</div>
</div>
</>
    )
}

export default Login;