import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../../Services/apiConnector';
import { contactusEndpoint } from '../../../Services/apis';
import toast from 'react-hot-toast';
import countryCode from '../../../data/countrycode.json'

const ContactForm = () => {
  const [loading ,setLoading] = useState(false);

  const{register,handleSubmit,reset,formState:{errors,isSubmitSuccessful}} =useForm();

  const submitContactForm = async(data)=>{
    console.log("Form Data : ",data);
    const toastId = toast.loading("Sending Message")
    try {
      setLoading(true)
      const response = await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data)
      console.log("Form response : ",response);
      setLoading(false);
      toast.success("Message Sent Succesfully")
    } catch (error) {
      console.log("Error in Contact us Form : ",error.message);
      setLoading(false)
      
      toast.error("Unable to send message")
    }
    toast.dismiss(toastId)
  }

  useEffect(()=>{
    if(isSubmitSuccessful){
      reset({
        email:"",
        firstName:"",
        lastName:"",
        phoneNumber:"",
        message:""
      })
    }
  },[reset,isSubmitSuccessful])
  return (
    <div className='mx-auto flex flex-col w-[50%]  mt-10  mb-10'>
        <div className='text-center'>
            <h1 className='text-3xl text-richblack-5'>Get in Touch</h1>
            <p className='text-sm text-richblack-200'>We'd love to here for you, Please fill the form</p>
        </div>
        <form onSubmit={handleSubmit(submitContactForm)}>
          <div className='flex flex-row gap-7 justify-start mt-4 '>
            <label>
              <p className=' text-richblack-50'>First Name</p>
              <input required type='First Name' name='firstName' placeholder='First Name' className='p-2 bg-richblack-700 w-full' id="firstName"{...register("firstName",{required:true})}/>
              {
                errors.firstName &&(
                  <span className=' text-richblack-5'>
                    Please Enter Your firstNameName
                  </span>
                )
              }
            </label>
            <label>
              <p className='text-richblack-50'>Last Name</p>
              <input required type='Last Name' name='lastName' placeholder='Last Name' className='p-2 bg-richblack-700 w-full' id="lastName" {...register("lastName",{required:true})}/>
              {
                errors.lastName &&(
                  <span className=' text-richblack-5'>
                    Please Enter Your lastName
                  </span>
                )
              }
            </label>
          </div>
          <label>
              <p className=' text-richblack-50 mt-4'>Email Address</p>
              <input required type='email' name='email' placeholder='Enter Email address' className='p-2 bg-richblack-700 w-full' id="userEmail" {...register("email",{required:true})}/>
              {
                errors.email && (
                  <span className=' text-richblack-5'>
                    Please Enter Your email
                  </span>
                )
              }
          </label>
          <label>
              <p className=' text-richblack-50 mt-4'>Phone Number</p>
              <div className='flex flex-row gap-5 w-full'>
                <select name='countrycode' id='countrycode' {...register("countrycode" ,{required:true})} className='w-[30%] bg-richblack-700 text-richblack-5'>
                    {
                      countryCode?.map((element,index)=>(
                        <option key={index}>
                          {element.code}-{element.country}
                        </option>
                      ))
                    }
                </select>
                <input required type='phone number' name='phoneNumber' placeholder='+91-123456789' className='p-2 bg-richblack-700 w-[70%] text-richblack-5' id="phoneNumber" {...register("phoneNumber",
                {
                  required:{value:true,message:"Please enter your Number"},
                  minLength:{value:8,message:"Invalid Number !!"},
                  maxLength:{value:10,message:"Invalid number !!"}
                })}/>
              </div>
              {
                errors.phoneNumber && (
                  <span className=' text-richblack-5'>
                    {errors.phoneNumber.message}
                  </span>
                )
              }
          </label>
          <label>
            <p className=' text-richblack-50 mt-4'>Message</p>
            <textarea id="message" name="message" rows="4" className=' bg-richblack-800 text-richblack-5 w-full rounded-md' {...register("message",{required:true})}/>
            {
              errors.message && (
                <span className=' text-richblack-5'>
                    Message can't be empty
                </span>
              )
            }
          </label>
          <button type='submit' className='bg-yellow-50 text-black w-full mt-10 py-2 px-4 rounded-full'>Send Message</button>
        </form>
    </div>
  )
}

export default ContactForm