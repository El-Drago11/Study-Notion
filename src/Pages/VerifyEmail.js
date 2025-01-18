import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OtpInput from 'react-otp-input';
import { sendOtp, signUp } from '../Services/operations/authApi';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const VerifyEmail = () => {
    const{signupData,loading} = useSelector((store)=>store.auth)
    const dispatch = useDispatch();
    const[otp,setOtp] = useState("");

    const navigate = useNavigate()
    

    const handleOnSubmit = (e)=>{
        e.preventDefault();

        const {firstName,lastName,email,password,confirmPassword,accountType,contactNumber} = signupData

        dispatch(signUp(firstName,lastName,email,password,confirmPassword,accountType,contactNumber,otp,navigate))
    }

    useEffect(()=>{
        if(!signupData){
            navigate("/signup")
        }
    },[])

  return (
    <div>
        {
            loading ? 
            (
                <div className='text-4xl text-richblack-5'>
                    Loading..........
                </div>
            )
            :
            (
                <div className='text-richblack-5 flex flex-col w-screen max-w-maxContent justify-center items-center h-screen mx-auto gap-7'>
                    <h1 className='text-3xl'>Verify Email</h1>
                    <p>A verification code has bee sent to your email Please enter the OTP</p>
                    <form onSubmit={handleOnSubmit}>   
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props}  className=' bg-richblack-700 m-4 text-richblack-5 h-11'/>}
                        />
                        <button type='submit' className='bg-yellow-50 text-black w-full mt-4 py-2 px-4 rounded-full'>Verify Email</button>
                        <div className='flex flex-row justify-between'>
                        <div className=' text-blue-200 mt-4'>
                            <Link to="/login">
                                <p>Back to login</p>
                            </Link>
                        </div>
                            <div className=' text-blue-200 mt-4' onClick={()=>dispatch(sendOtp(signupData.email))}>
                                <p>Resend Email</p>
                            </div>
                        </div>
                    </form>
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail