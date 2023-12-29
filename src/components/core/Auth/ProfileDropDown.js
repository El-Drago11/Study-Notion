import React from 'react'
import {CiSearch} from 'react-icons/ci'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userLogout } from '../../../Services/operations/authApi'

const ProfileDropDown = () => {
  const {user} = useSelector((store)=>store.profile)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className='text-3xl text-richblack-5 flex flex-row mx-auto gap-5 items-center'>
      <CiSearch className=' cursor-pointer'/>
      <div className='group h-auto w-auto flex flex-row items-center relative'>
        <img src={user?.image} alt='ProfileImg' className='h-10 rounded-full cursor-pointer '/>
        <div className='invisible absolute translate-y-7 top-[50%] flex flex-col rounded-md bg-richblack-25 text-richblack-800 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[7rem] z-20 gap-2 p-2'>
        <Link to="/dashboard/my-profile">
            <div className="flex w-full items-center p-3 text-sm hover:text-richblack-900 hover:bg-richblack-200 rounded-md">
              Dashboard
            </div>
          </Link>
          <div className="flex w-full items-center p-3 text-sm hover:text-richblack-900 hover:bg-richblack-200 rounded-md" onClick={()=>userLogout(dispatch,navigate)}>
            Logout
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default ProfileDropDown