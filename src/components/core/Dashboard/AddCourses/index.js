import React from 'react'
import { Link } from 'react-router-dom'
import RenderStep from './RenderStep'
import { IoIosArrowBack } from "react-icons/io";

const  AddCourses = () => {
  return (
    <div className=' w-[100%]  max-w-maxContent flex flex-row mx-auto justify-between pt-4 gap-4'> 
        <div className=' w-[70%]'>
            <Link to="/dashboard/my-profile"><div className='flex flex-row gap-1 items-center text-richblack-100 text-lg'>{<IoIosArrowBack />}Back to DashBoard</div></Link>
            <div>
                <RenderStep/>
            </div>
        </div>
        <div className=' text-richblack-5 w-[30%] bg-richblack-700 p-4 rounded-md h-fit'>
            <p className=' text-xl mb-3'>Code Upload Tips:</p>
            <ul className=' flex gap-y-2 flex-col ml-3 text-sm'>
                <li>Set the Course Price option or make it free.</li>
                <li>Standard size for the course thumbnail is 1024x576.</li>
                <li>Video section controls the course overview video.</li>
                <li>Course Builder is where you create & organize a course.</li>
                <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                <li>Information from the Additional Data section shows up on the course single page.</li>
                <li>Make Announcements to notify any important</li>
                <li>Notes to all enrolled students at once.</li>
            </ul>
        </div>    
    </div>
  )
}

export default  AddCourses