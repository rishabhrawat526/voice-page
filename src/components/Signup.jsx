import React from 'react'
import {useForm} from "react-hook-form";
import Input from './Input';
import Button from './Button';
import { DevTool } from '@hookform/devtools';

function Signup() {
  const {register,control,formState,handleSubmit} = useForm();
  const {errors} = formState;
  const onSubmit=(data)=>{
    
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" label="Username" {...register("username",{required:{value:true, message:"enter a username"}})}/>
        <p>{errors.username?.message}</p>
        <Input type="email" label="Email" {...register("email",{required:'email is required',pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,message:'enter a valid email'}})}/>
        <p>{errors.email?.message}</p>
        <Input type="password" label="Password" {...register("password",{required:"enter a password",minLength:{value:8,message:"min lenght should be 8"}})} />
        <p>{errors.password?.message}</p>
        <Button children="register"/>
        <DevTool control={control}/>
    </form>
  )
}

export default Signup