import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getEnrolledCourses } from '../../../Services/operations/profileApi';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {

    const navigate = useNavigate()
    const[enrolledCourses , setEnrolledCourses] = useState(null);

    const getEnrolledCoursesData = async()=>{
        try {
           const response = await getEnrolledCourses()
           setEnrolledCourses(response);
        } catch (error) {
            throw new Error(error)
        }
    }

    useEffect(()=>{
        getEnrolledCoursesData()
    },[])

  return (
    <div className=' w-11/12 max-w-maxContent text-richblack-5'>
        <div className=' text-start text-richblack-5 text-3xl mt-10'>Enrolled Courses</div>
        {
            !enrolledCourses ? (<div>Loading</div>) : !enrolledCourses.length ?(<p className=' text-center text-3xl mt-10'>No Course Enrolled</p>) :
            (
                <div>
                    {/* Course Card */}
                    {enrolledCourses.map((course,index)=>(
                        <div className=' grid grid-cols-3 gap-6 mb-6 mt-6' id={index} onClick={()=>navigate(`/dashboard/enrolled-course/${course._id}`)}>
                            <div className='flex flex-row'>
                                <img src={course?.thumbnail} className='object-cover'/>
                            </div>
                            <div className='flex flex-col'>
                                    <p className=' text-yellow-50 font-bold text-lg'>Title : {course?.courseName}</p>
                                    <p>{course?.courseDescription}</p>
                            </div>
                            <div className=' flex flex-col gap-2'>
                                <p>Progress : {course?.progressPercentage || 0}%</p>
                                <div>
                                    <ProgressBar completed={course?.progressPercentage || 0} height='5px' isLabelVisible={false}/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )
        }
    </div>
  )
}

export default EnrolledCourses