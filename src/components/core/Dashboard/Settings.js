import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn'
import { useNavigate } from 'react-router-dom';
import ChangeProfile from './settingData/ChangeProfile';
import DeleteAccount from './settingData/DeleteAccount';
import ProfileUpdate from './settingData/ProfileUpdate';

const Settings = () => {
  const {user} = useSelector((store)=>store.profile)
  const navigate = useNavigate();
  return (
    <div className=' text-richblack-5 flex flex-col w-11/12 max-w-maxContent  mt-10 gap-7'>
      <ChangeProfile user={user}/>

      <ProfileUpdate/>

      <div className='bg-richblack-800 p-6 rounded-md'>
        <h1 className=' text-3xl text-richblack-5'>Password</h1>
        <div className=' grid md:grid-cols-2 sm:grid-cols-1 text-richblack-100 mt-4'>
          <div>
            <label>
              <p>Current Password</p>
              <input type='password' placeholder='currentPassword' name='oldPassword'  className=' bg-richblack-500 py-2 px-3 rounded-md'/>
            </label>
          </div>
          <div>
            <label>
              <p>New Password</p>
              <input type='password' placeholder='newPassword' name='newPassword'  className=' bg-richblack-500 py-2 px-3 rounded-md'/>
            </label>
          </div>
        </div>
      </div>
      
      <DeleteAccount/>

      <div className=' flex flex-row justify-end gap-4  mb-10'>
        <button className=' rounded-md text-richblack-25 bg-richblack-400 py-2 px-3' onClick={()=>{navigate('/')}}>Cancel</button>
        <IconBtn text="SAVE"/>
      </div>

    </div>
  )
}

export default Settings