import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import { FaUser } from 'react-icons/fa';
import { useState } from 'react';

const MyProfile = () => {
    const {user} = useSelector((store)=>store.profile)
    const navigate = useNavigate();
    const[imgErr , setImgErr] = useState(false);
    return (
        <div className='p-7 w-[100%] overflow-hidden'>
            <h1 className='text-richblack-5 text-4xl'>My Profile</h1>

            <div className='grid md:grid-cols-2  sm:grid-cols-1 mt-10 w-11/12 gap-4 bg-richblack-800 rounded-md p-6'>
                <div className='flex md:flex-row items-center gap-7 flex-col'>
                    {imgErr || !user?.image ?  (<FaUser className='h-10 w-10 text-white' />)
                     : (<img src={user?.image} alt={user?.firstName} className='rounded-full h-16'/>) }
                    <div className='flex flex-col'>
                        <p className='text-richblack-5'>{user?.firstName}</p>
                        <p className=' text-richblack-300'>{user?.email}</p>
                    </div>
                </div>
                <div className='flex justify-end h-auto items-center'>
                    <IconBtn text="Edit" onclick={()=>navigate("/dashboard/settings")}></IconBtn>
                </div>
            </div>

            {/* About Section */}
            <div className='grid md:grid-cols-2 sm:grid-cols-1 mt-10 w-11/12 bg-richblack-800 rounded-md p-6'>
                <div className='flex flex-row items-center w-[90%]'>
                    <div className=' flex flex-col'>
                        <p className='text-richblack-5 text-lg'>About</p>
                        <p className=' text-richblack-300'>Write Something here</p>
                    </div>
                </div>
                <div className='flex justify-end h-auto items-center'>
                    <IconBtn text="Edit" onclick={()=>navigate("/dashboard/settings")}></IconBtn>
                </div>
            </div>

            {/* Personal details */}
            <div className='flex flex-col mt-10 w-11/12 bg-richblack-800 rounded-md p-6 text-ellipsis overflow-hidden'>
                <div className='grid md:grid-cols-2 sm:grid-cols-1'>
                    <div className='flex flex-col'>
                        <p className='text-richblack-5 text-lg'>Personal details</p>
                    </div>
                    <div className='flex justify-end h-auto items-center'>
                        <IconBtn text="Edit" onclick={()=>navigate("/dashboard/settings")}></IconBtn>
                    </div>
                </div>
                <div className='flex flex-col  w-[100%] gap-7 mt-10 items-start'>
                    <div className=' grid md:grid-cols-2 sm:grid-cols-1 gap-4 w-11/12'>
                        <div className=' flex flex-col'>
                            <p className=' text-richblack-600'>firstName</p>
                            <p className=' text-richblack-100'>{user?.firstName}</p>
                        </div>
                        <div className=' flex flex-col'>
                            <p className=' text-richblack-600'>lastName</p>
                            <p className=' text-richblack-100'>{user?.lastName}</p>
                        </div>
                    </div>
                    <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-4 w-11/12'>
                        <div className=' flex flex-col'>
                            <p className=' text-richblack-600'>Email</p>
                            <p className=' text-richblack-100'>{user?.email}</p>
                        </div>
                        <div className=' flex flex-col'>
                            <p className=' text-richblack-600'>Conatct Number</p>
                            <p className=' text-richblack-100'>{user?.additionalDetails?.contactNumber ? user?.additionalDeatils?.contactNumber :"None"}</p>
                        </div>
                    </div>
                    <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-4 w-11/12'>
                        <div className=' flex flex-col'>
                            <p className=' text-richblack-600'>Gender</p>
                            <p className=' text-richblack-100'>{user?.additionalDetails.gender ? user?.additionalDeatils?.gender :"None"}</p>
                        </div>
                        <div className=' flex flex-col'>
                            <p className=' text-richblack-600'>Date Of Birth</p>
                            <p className=' text-richblack-100'>{user?.additionalDetails?.dateOfBirth ? user?.additionalDeatils?.dateOfBirth :"None"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile