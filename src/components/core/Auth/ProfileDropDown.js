import React, { useState } from 'react'
import {CiSearch} from 'react-icons/ci'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userLogout } from '../../../Services/operations/authApi'
import { FaUser } from 'react-icons/fa';

const ProfileDropDown = () => {
  const {user} = useSelector((store)=>store.profile)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[imgErr , setImgErr] = useState(false);

  return (
    <div className='text-3xl text-richblack-5 flex flex-row mx-auto gap-5 items-center'>
      <div className='group h-auto w-auto flex flex-row items-center relative'>
        {imgErr || !user?.image ? (<FaUser className='h-5 w-10 text-gray-500' />)
        :( <img src={user?.image} alt='ProfileImg' className='h-7 md:h-10 rounded-full cursor-pointer ' onError={()=>setImgErr(true)}/>)}
        <div className='invisible absolute translate-y-7 top-[50%] left-[-5rem] flex flex-col rounded-md bg-richblack-25 text-richblack-800 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[7rem] z-20 gap-2 p-2'>
        <Link to="/dashboard/my-profile">
            <div className="flex w-full items-center p-3 text-sm hover:text-richblack-900 hover:bg-richblack-200 rounded-md">
              Dashboard
            </div>
          </Link>
          <div className="flex w-full items-center p-3 text-sm hover:text-richblack-900 hover:bg-richblack-200 rounded-md hover:cursor-pointer" onClick={()=>dispatch(userLogout(dispatch,navigate))}>
            Logout
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default ProfileDropDown