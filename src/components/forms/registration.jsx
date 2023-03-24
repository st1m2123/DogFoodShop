import React, { useState } from "react";
import { useForm } from "react-hook-form";
import s from "./forms.module.css";
import Api from '../../utils/api'
import Button from '../Button/button'



const RegistrationForm = ({addContact, active, setActive, linkState}) => {
    const [userInfo, setUserInfo] = useState();

// const handlerOnChange = (event) => {
//     setUserInfo({...userInfo, [event.target.name]: event.target.value});
// };
const group = {
    group: 'group-10'
};

const {register, handleSubmit, formState: {errors} } = useForm();

// const handleSubmit = (event) => {
//     event.preventDefault();
//     addContact(userInfo);
//     setUserInfo({ 
//         name: '',
//         lastName: '',
//         password: ''
//     });
// }
const onSubmit = (data) => {
    // data.preventDefault()
    setUserInfo({...data, ...group});
    handleReg(userInfo);
}
const handleReg = (userInfo) =>{
Api.signUp(userInfo);
console.log(userInfo);
}
const onHandleClose = () => {
    setActive(false);
    console.log(active);
}
    return (
        // <form className={s.form} onSubmit={handleSubmit}>
<>
<div className={s.windowForm}>
<a className={s.closeBtn} onClick={onHandleClose}>X</a>
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
<h3>Регистрация</h3>
            <input 
            {...register('email')}
            type="text"
            // name="name" 
            placeholder="Введите email" 
            // value={userInfo.name}
            // onChange={handlerOnChange}
            />

            <input 
            {...register('password',{
                pattern: {
                    value: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,
                    message: "Пароль слишком лёгкий"
                }
            })}
            type="password" 
            // name="password" 
            placeholder="Введите пароль"
            // value={userInfo.password} 
            // onChange={handlerOnChange}
            />
            <p className={s.regRules}>Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой конфиденциальности и соглашаетесь на информационную рассылку.</p>
            <Button look='primary'>Зарегистрироваться</Button>
            <Button look='secondary' href="/login" linkState={linkState}>Войти</Button>
</form>
<div>
    {errors && errors.password ? <p>{errors.password.message}</p> : null}
</div>
</div>
</>
        // </form>
    );
};

export default RegistrationForm;