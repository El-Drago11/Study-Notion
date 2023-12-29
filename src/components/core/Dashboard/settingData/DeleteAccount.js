import React from 'react'
import { RiDeleteBin5Line } from "react-icons/ri";

const DeleteAccount = () => {
  return (
    <div className=' flex flex-row flex-wrap gap-4 bg-richblack-800 p-6 rounded-md'>
        <div><RiDeleteBin5Line className=' text-3xl'/></div>
        <div>
          <h1 className=' text-richblack-5 text-xl'>Delete Account</h1>
          <p className=' text-richblack-100 text-sm'>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
          <p className=' text-lg text-richblack-5'>I want to delete my account.</p>
        </div>
    </div>
  )
}

export default DeleteAccount