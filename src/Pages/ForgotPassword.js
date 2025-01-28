import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPasswordResetToken } from '../Services/operations/authApi'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {

    const [emailSent, setEmailSent] = useState(false)
    const[email,setEmail] = useState("")
    const {loading} = useSelector((store)=>store.auth)
    const dispatch = useDispatch();

    const handleOnSubmit =(e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent))
    }

  return (
    <div className='w-full flex flex-row justify-center items-center h-screen'>
        {
            loading ? (
                <div className='text-4xl text-richblack-5'>Loading.....</div>
            ):(
                <div className='w-11/12 lg:w-[25%]'>
                    <h1 className=' text-richblack-5 text-3xl mb-4'>{!emailSent?"Reset Your Password" : "Check Your Email"}</h1>
                    <p className='text-richblack-100 mb-4'>
                        {!emailSent?"Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery":`Check email We have sent the reset email to ${email}`}
                    </p>
                    <form onSubmit={handleOnSubmit}>
                        {
                            !emailSent && (
                                <label className='flex flex-col text-richblack-25 gap-2 '>
                                    <p>Email Address : </p>
                                    <input required type='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email Here' className='p-2 bg-richblack-700' id="userEmail"/>
                                </label>
                            )
                        }
                        <button type='submit' className='bg-yellow-50 text-black w-full mt-4 py-2 rounded-full'>
                            {
                                !emailSent ? "Reset Password" : "Resend Email"
                            }
                        </button>
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

export default ForgotPassword