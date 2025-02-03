import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../../common/IconBtn';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { updateProfileDetails } from '../../../../Services/operations/profileApi';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../../Store/profileReducer';

const ProfileUpdate = () => {
  const {user} = useSelector((store)=>store.profile)
  const dispatch = useDispatch();
  const {setValue,register, handleSubmit, formState: { errors } } = useForm()

  const changeDetails = async (data) => {
    const { firstName, dateOfBirth, contactNumber, lastName, gender, about } = data
    const response = await updateProfileDetails(firstName,dateOfBirth,contactNumber,lastName,gender,about)
    dispatch(setUser(response.data.updatedUser))
    localStorage.setItem("user", JSON.stringify(response.data.updatedUser))
    return;
  }

  useEffect(()=>{
    setValue('firstName',user?.firstName)
    setValue('dateOfBirth',user?.additionalDetails?.dateOfBirth)
    setValue('contactNumber',user?.additionalDetails?.contactNumber)
    setValue('lastName',user?.lastName)
    setValue('gender',user?.additionalDetails?.gender)
    setValue('about',user?.additionalDetails?.about)
  },[user])

  return (
    <div className=' bg-richblack-800 p-6 rounded-md'>
      <h1 className=' text-richblack-5 text-3xl'>Profile Update</h1>
      <form onSubmit={handleSubmit(changeDetails)}>
        <div class="grid md:grid-rows-3 sm:grid-rows-6 md:grid-flow-col gap-4 text-richblack-5 mt-4">
          <div>
            <label>
              <p>First Name</p>
              <input type='name' placeholder='first-name' name='firstName' className=' bg-richblack-500 py-2 px-3 rounded-md'
                {...register('firstName', { required: 'First Name is required' })} />
                <ErrorMessage
                  errors={errors}
                  name="firstName"
                  render={({ message }) => <p className=' text-pink-300'>{message}</p>}
                />
            </label>
          </div>
          <div>
            <label>
              <p>Date Of Birth</p>
              <input type='Date' placeholder='D.O.B' name='dateOfBirth' className=' bg-richblack-500 py-2 px-3 rounded-md'
                {...register('dateOfBirth', { required: 'DOB is required' })} />
              <ErrorMessage
                errors={errors}
                name="dateOfBirth"
                render={({ message }) => <p className=' text-pink-300'>{message}</p>}
              />
            </label>
          </div>
          <div>
            <label>
              <p>Phone Number</p>
              <input type='tel' placeholder='Phone-number' name='contactNumber' className=' bg-richblack-500 py-2 px-3 rounded-md'
                {...register('contactNumber', {
                  required: 'Contact Number is Required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Enter a valid 10-digit phone number'
                  }
                })} />
              <ErrorMessage
                errors={errors}
                name="contactNumber"
                render={({ message }) => <p className=' text-pink-300'>{message}</p>}
              />
            </label>
          </div>
          <div>
            <label>
              <p>last Name</p>
              <input type='text' placeholder='last-name' name='lastName' className=' bg-richblack-500 py-2 px-3 rounded-md'
                {...register('lastName', { required: 'Last Name is Required' })} />
              <ErrorMessage
                errors={errors}
                name="lastName"
                render={({ message }) => <p className=' text-pink-300'>{message}</p>}
              />
            </label>
          </div>
          <div>
            <label>
              <p>Gender</p>
              <select name='gender' className='bg-richblack-500 py-2 px-3 rounded-md w-1/2 md:w-1/3'
                {...register('gender', { required: 'Select your gender' })}>
                <option value={'male'} selected>Male</option>
                <option value={'female'}>Female</option>
              </select>
              <ErrorMessage
                errors={errors}
                name="gender"
                render={({ message }) => <p className=' text-pink-300'>{message}</p>}
              />
            </label>
          </div>
          <div>
            <label>
              <p>About</p>
              <input type='text' placeholder='Tell us about Yourself' name='about' className=' bg-richblack-500 py-2 px-3 rounded-md text-richblack-25' {...register('about', { required: 'Please enter about yourself' })} />
              <ErrorMessage
                errors={errors}
                name="about"
                render={({ message }) => <p className=' text-pink-300'>{message}</p>}
              />
            </label>
          </div>
        </div>
        <button className=' rounded-md text-black bg-yellow-100 py-2 px-3 mt-4' type='submit'>Save</button>
      </form>
    </div>
  )
}

export default ProfileUpdate