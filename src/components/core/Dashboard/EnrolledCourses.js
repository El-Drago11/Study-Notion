import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getEnrolledCourses } from '../../../Services/operations/profileApi';
import ProgressBar from '@ramonak/react-progress-bar';

const EnrolledCourses = () => {

    const{token} = useSelector((store)=>store.auth)
    const[enrolledCourses , setEnrolledCourses] = useState(null);

    const getEnrolledCoursesData = async(token)=>{
        try {
           const response = await getEnrolledCourses(token)
           setEnrolledCourses(response);
        //    console.log(enrolledCourses)
        } catch (error) {
            console.log(error.message);
            console.log('Unable to fetch Enrolled Courses')
        }
    }

    useEffect(()=>{
        getEnrolledCoursesData(token)
    },[])

  return (
    <div className=' w-11/12 max-w-maxContent text-richblack-5'>
        <div className=' text-start text-richblack-5 text-3xl mt-10'>Enrolled Courses</div>
        {
            !enrolledCourses ? (<div>Loading</div>) : !enrolledCourses.length ?(<p className=' text-center text-3xl mt-10'>No Course Enrolled</p>) :
            (
                <div>
                    <div>
                        <p>Course name</p>
                        <p>Duration</p>
                        <p>Progress</p>
                    </div>
                    {/* Course Card */}
                    {enrolledCourses.map((course,index)=>(
                        <div className=' grid grid-cols-6' id={index}>
                            <div className='flex flex-row col-span-2'>
                                <img src={course?.thumbnail}/>
                                <div className=' flex flex-col'>
                                    <p>{course?.courseName}</p>
                                    <p>{course?.courseDescription}</p>
                                </div>
                            </div>
                            <div>
                                <p>{course?.totalDuration}</p>
                            </div>
                            <div className=' flex flex-col'>
                                <p>Progress : {course?.progressPercentage || 0}%</p>
                                <div>
                                    <ProgressBar completed={course?.progressPercentage || 0} height='1px' isLabelVisible={false}/>
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