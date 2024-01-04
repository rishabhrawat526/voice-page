import React from 'react'
import {useForm} from "react-hook-form"
import {DevTool} from "@hookform/devtools"
import Input from "./Input";
import Button from "./Button";
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import authService from '../appwrite/auth';
import { useNavigate } from 'react-router-dom';
function LoginForm() {
    const {register,control,handleSubmit,formState} = useForm();
    const {errors} = formState;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const {id,name,onBlur,onChange} = register('username');
    const onSubmit=async(data)=>{
        const response = await authService.login(data);
        if(response)
        {
            const userData = await authService.getCurrentUser();
            if(userData)
            {
                dispatch(login(userData));
                navigate('/');
            }
        }
    };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input label="Email" type="email" {...register("email",{pattern:{
            value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,message:'Invalid Email Format'}})}/>
            <p>{errors.email?.message}</p>
        <Input label="Password"  type="password" {...register("password",{required:'password is required',minLength:{
            value:8,message:'password should be more than 8 length'
        }})}/>
        <p>{errors.password?.message}</p>
        <Button children="Login"/>
        <DevTool control={control}/>
    </form>
  )
}

export default LoginForm