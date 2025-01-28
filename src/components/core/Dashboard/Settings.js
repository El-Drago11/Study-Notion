import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn'
import { useNavigate } from 'react-router-dom';
import ChangeProfile from './settingData/ChangeProfile';
import DeleteAccount from './settingData/DeleteAccount';
import ProfileUpdate from './settingData/ProfileUpdate';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { changeUserPassword } from '../../../Services/operations/profileApi';

const Settings = () => {
  const { user } = useSelector((store) => store.profile)
  const navigate = useNavigate();

  const { register, getValues} = useForm()

  const changePassword = async() => {
    const oldPassword = getValues("oldPassword");
    if (!oldPassword) {
      toast.error("Old password is required")
      return;
    }
    const newPassword = getValues("newPassword");
    if (!newPassword) {
      toast.error("New password is required")
      return;
    }

    const confirmPassword = getValues("confirmPassword");
    if (!confirmPassword) {
      toast.error("confirmPassword password is required")
      return;
    }

    if(newPassword!==confirmPassword){
      toast.error("Confirm password and new password not matched");
      return;
    }

    if(oldPassword===newPassword){
      toast.error("Old password cannot be same as new password");
      return;
    }

    await changeUserPassword(oldPassword,newPassword,confirmPassword)

  }

  return (
    <div className=' text-richblack-5 flex flex-col w-11/12 max-w-maxContent  mt-10 gap-7'>
      <ChangeProfile user={user} />

      <ProfileUpdate />

      <div className='bg-richblack-800 p-6 rounded-md'>
        <h1 className=' text-3xl text-richblack-5'>Password</h1>
        <div className=' grid md:grid-cols-2 sm:grid-cols-1 text-richblack-100 mt-4'>
          <div>
            <label>
              <p>Current Password</p>
              <input type='password' placeholder='currentPassword' name='oldPassword' className=' bg-richblack-500 py-2 px-3 rounded-md'{
                ...register("oldPassword")
              } />
            </label>
          </div>
          <div>
            <label>
              <p>New Password</p>
              <input type='password' placeholder='newPassword' name='newPassword' className=' bg-richblack-500 py-2 px-3 rounded-md' {...register("newPassword")} />
            </label>
          </div>
          <div>
            <label>
              <p>Confirm Password</p>
              <input type='password' placeholder='confirmPassword' name='confirmPassword' className='bg-richblack-500 py-2 px-3 rounded-md'{
                ...register("confirmPassword")
              } />
            </label>
          </div>
        </div>
        <button className=' rounded-md text-black bg-yellow-100 py-2 px-3 mt-4' onClick={() => changePassword()}>Change Password</button>
      </div>

      <DeleteAccount />

      <div className=' flex flex-row justify-end gap-4  mb-10'>
        <button className=' rounded-md text-richblack-25 bg-richblack-400 py-2 px-3' onClick={() => { navigate('/') }}>Cancel</button>
        <IconBtn text="SAVE" />
      </div>

    </div>
  )
}

export default Settings