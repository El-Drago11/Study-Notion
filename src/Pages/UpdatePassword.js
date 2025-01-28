import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai'
import { resetPassword } from '../Services/operations/authApi';

const UpdatePassword = () => {
    const {loading} = useSelector((store)=>store.auth)
    const dispatch = useDispatch();
    const location = useLocation();

    const [emailSent, setEmailSent] = useState(false)
    const[showPassword , setShowPassword] = useState(false)
    const[showConfirmPassword , setShowConfirmPassword] = useState(false)
    const[password,setPassword] = useState("");
    const[confirmPassword,setConfirmPassword] = useState("")

    const handleOnSubmit =(e)=>{
        e.preventDefault();
        // token fetched from the head
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password,confirmPassword,token,setEmailSent))
    }

  return (
    <div>
        {
            loading ?( 
                    <div className='text-4xl text-richblack-5'>
                        Loading..........
                    </div>
                )
            :
            (
                <div className='text-richblack-5 flex flex-col w-11/12 lg:w-screen justify-center items-center h-screen mx-auto'>
                    <h1 className='text-3xl'>{!emailSent ? "Choose a new Password" : "Reset Successfully"}</h1>
                    <p>{!emailSent ? "Almost done. Enter your new password and YOu are set to go....":`we have  reset your account Password`}</p>
                    <form onSubmit={handleOnSubmit}>
                        { 
                            !emailSent && (
                            <div className='w-full md:w-[25rem]'>
                                <label className='flex flex-col text-richblack-25 gap-2 mb-7 mt-4'>
                                    <p>New Password</p>
                                    <div className='flex flex-row items-center'>
                                        <input required type={showPassword ? 'text':'password'} name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password' className='p-2 bg-richblack-700 w-full' id="userPassword"/>
                                        <span onClick={()=>{setShowPassword((prev)=>!prev)}} className='-translate-x-7'>
                                            {
                                                !showPassword ? <AiFillEyeInvisible fontSize={24}/> : <AiFillEye fontSize={24}/>
                                            }
                                        </span>
                                    </div>
                                </label>
                                <label className='flex flex-col text-richblack-25 gap-2 mb-7'>
                                    <p>New Password</p>
                                    <div className='flex flex-row items-center'>
                                        <input required type={showConfirmPassword ? 'text':'password'} name='confirmPassword' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='Confirm Password' className='p-2 bg-richblack-700 w-full' id="userConfirmPassword"/>
                                        <span onClick={()=>{setShowConfirmPassword((prev)=>!prev)}} className='-translate-x-7'>
                                            {
                                                !showConfirmPassword ? <AiFillEyeInvisible fontSize={24}/> : <AiFillEye fontSize={24}/>
                                            }
                                        </span>
                                    </div>
                                </label>
                                <button type='submit' className='bg-yellow-50 text-black w-full mt-4 py-2 px-4 rounded-full'>
                                    Reset Password
                                </button>
                            </div>
                            )
                        }
                    </form>
                    <div className=' text-blue-200 mt-4'>
                        <Link to="/login">
                            <p>Back to login</p>
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default UpdatePassword