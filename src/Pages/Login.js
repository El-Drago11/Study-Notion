import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'
import loginImage from '../assets/Images/login.webp'
import { useDispatch } from 'react-redux';
import { login } from '../Services/operations/authApi';

const tabsName = ["Student","Instructor"]

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const [accountType , setAccountType] = useState(tabsName[0])

  const whoIsLogin = (value) =>{
    setAccountType(value);
  }

  const userLogin = (e)=>{
    e.preventDefault();
    dispatch(login(email,password,navigate))
  }

  return (
    <div className='flex flex-row items-center w-11/12 justify-center max-w-maxContent gap-20 h-screen mx-auto'>
      <div className='flex flex-col p-4 gap-4 w-[40%]'>
        <div className='text-4xl text-richblack-5'>Welcome Back</div>
        <div className=' text-md text-richblack-300'><span>Build skills for today, tomorrow, and beyond.</span><span className=' text-blue-300'>Education to future-proof your career.</span></div>
        <div className=' bg-richblack-600 p-1 rounded-full w-fit'>
          <ul className='flex flex-row gap-4 text-richblack-100'>
            {tabsName?.map((element,index)=>(
                <li className={`hover:bg-richblack-700 hover:text-richblack-25 rounded-full px-2 ${element===accountType ? "bg-richblack-900":""}`} key={index} onClick={()=>{whoIsLogin(element)}}>
                  {element}
                </li>
            ))}
          </ul>
        </div>
        <form onSubmit={userLogin}>
          <label>
            <p className=' text-richblack-50'>Email Address</p>
            <input required type='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email address' className='p-2 bg-richblack-700 w-full' id="userEmail"/>
          </label>
          <label>
            <p className='text-richblack-50 mt-4'>Password</p>
            <input required type='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password' className='p-2 bg-richblack-700 w-full' id="userPassword"/>
          </label>
          <div className='text-sm text-blue-200 text-right mt-1'><Link to={"/forgot-password"}>ForgotPassword?</Link></div>
          <button type='submit' className='bg-yellow-50 text-black w-full mt-10 py-2 px-4 rounded-full'>SignIn</button>
        </form>
      </div>
      <div className='loginPageImage w-[40%]'>
        <img src={loginImage} className='w-fit -translate-y-5 -translate-x-4'/>
      </div>
    </div>
  )
}

export default Login