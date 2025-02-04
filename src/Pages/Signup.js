import React, { useState } from 'react'
import '../App.css'
import signupImage from '../assets/Images/signup.webp'
import { setSignupData } from '../Store/authReducer';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { sendOtp } from '../Services/operations/authApi';
import { useLocation, useNavigate } from 'react-router-dom';

const tabsName = ["Student","Instructor"]

const Signup = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();

  const[firstName,setFirstName] = useState("");
  const[lastName,setLastName] = useState("");
  const[email,setEmail] = useState("");
  const[contactNumber,setContactNumber] = useState("");
  const[password,setPassword] = useState("");
  const[confirmPassword,setConfirmPassword] = useState("");

  const [accountType , setAccountType] = useState(location?.state?.accountType || tabsName[0])

  const whoIsLogin = (value) =>{
    setAccountType(value);
  }
  const userDataSubmission=(e)=>{
    e.preventDefault();
    if(password!=confirmPassword){
      toast.error("Password doen't match");
      return;
    }
    const userSignupData = {firstName,lastName,email,password,confirmPassword,accountType,contactNumber};
    dispatch(setSignupData(userSignupData))
    dispatch(sendOtp(email,navigate))
  }

  return (
    <div className='flex flex-col-reverse lg:flex-row items-center w-11/12 justify-center max-w-maxContent gap-7 lg:gap-20 min-h-screen mx-auto'>
      <div className='flex flex-col p-4 gap-4 w-11/12 lg:w-[40%]'>
        <div className='text-4xl text-richblack-5'>Join the millions learning to code with StudyNotion for free</div>
        <div className=' text-md text-richblack-300'><span>Build skills for today, tomorrow, and beyond. </span><span className=' text-blue-300'>Education to future-proof your career.</span></div>
        <div className=' bg-richblack-600 p-1 rounded-full w-fit'>
          <ul className='flex flex-row gap-4 text-richblack-100'>
            {tabsName?.map((element,index)=>(
                <li className={`hover:bg-richblack-700 hover:text-yellow-25 rounded-full px-2 cursor-pointer ${element===accountType ? "bg-richblack-900 text-yellow-25":""}`} key={index} onClick={()=>{whoIsLogin(element)}}>
                  {element}
                </li>
            ))}
          </ul>
        </div>
        <form onSubmit={userDataSubmission}>
          <div className='flex flex-row justify-between mt-4'>
            <label>
              <p className=' text-richblack-50'>First Name</p>
              <input required type='First Name' name='firstName' value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder='First Name' className='p-2 bg-richblack-700 w-full' id="firstName"/>
            </label>
            <label>
              <p className='text-richblack-50'>Last Name</p>
              <input required type='Last Name' name='lastName' value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder='Last Name' className='p-2 bg-richblack-700 w-full' id="lastName"/>
            </label>
          </div>
          <label>
              <p className=' text-richblack-50 mt-4'>Email Address</p>
              <input required type='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email address' className='p-2 bg-richblack-700 w-full' id="userEmail"/>
          </label>
          <label>
              <p className=' text-richblack-50 mt-4'>Phone Number</p>
              <input required type='phone number' name='phoneNumber' value={contactNumber} onChange={(e)=>setContactNumber(e.target.value)} placeholder='+91-123456789' className='p-2 bg-richblack-700 w-full' id="phoneNumber"/>
          </label>
          <div className='flex flex-row justify-between mt-4'>
            <label>
              <p className='text-richblack-50'>Password</p>
              <input required type='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password' className='p-2 bg-richblack-700 w-full' id="userPassword"/>
            </label>
            <label>
              <p className='text-richblack-50'>Confirm Password</p>
              <input required type='password' name='confirmPassword' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='Confirm-Password' className='p-2 bg-richblack-700 w-full' id="userConfirmPassword"/>
            </label>
          </div>
          <button type='submit' className='bg-yellow-50 text-black w-full mt-4 py-2 px-4 rounded-full'>Create Account</button>
        </form>
      </div>
      <div className='loginPageImage w-[40%]'>
        <img src={signupImage} className='w-fit -translate-y-5 -translate-x-4'/>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Signup