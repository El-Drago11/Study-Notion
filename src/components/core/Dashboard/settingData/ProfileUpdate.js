import React from 'react'

const ProfileUpdate = () => {
  return (
    <div className=' bg-richblack-800 p-6 rounded-md'>
        <h1 className=' text-richblack-5 text-3xl'>Profile Update</h1>
        <div class="grid md:grid-rows-3 sm:grid-rows-6 md:grid-flow-col gap-4 text-richblack-100 mt-4">
          <div>
            <label>
              <p>First Name</p>
              <input type='name' placeholder='first-name' name='firstName' className=' bg-richblack-500 py-2 px-3 rounded-md'/>
            </label>
          </div>
          <div>
          <label>
              <p>Date Of Birth</p>
              <input type='Date' placeholder='D.O.B' name='dateOfBirth' className=' bg-richblack-500 py-2 px-3 rounded-md' />
            </label>
          </div>
          <div>
          <label>
              <p>Phone Number</p>
              <input type='phoneNumber' placeholder='Phone-number' name='contactNumber' className=' bg-richblack-500 py-2 px-3 rounded-md'/>
            </label>
          </div>
          <div>
          <label>
              <p>last Name</p>
              <input type='name' placeholder='last-name' name='lastName' className=' bg-richblack-500 py-2 px-3 rounded-md'/>
            </label>
          </div>
          <div>
          <label>
              <p>Gender</p>
              <input type='name' placeholder='Gender' name='gender' className=' bg-richblack-500 py-2 px-3 rounded-md'/>
            </label>
          </div>
          <div>
          <label>
              <p>About</p>
              <input type='text' placeholder='Tell us about Yourself' name='about' className=' bg-richblack-500 py-2 px-3 rounded-md text-richblack-25'/>
            </label>
          </div>
        </div>
      </div>
  )
}

export default ProfileUpdate