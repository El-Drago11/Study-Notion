import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import { courseEndpoints } from '../../../../Services/apis';
import { getFullDetailsOfCourse } from '../../../../Services/operations/courseDetailsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../../../Store/authReducer';
import ReactPlayer from 'react-player';

const CourseFullDetails = () => {
    const params = useParams();
    const dispatch = useDispatch()
    const { token } = useSelector((store) => store.auth)
    const [getCourse, setCourse] = useState(null);


    const getCourseFullDetails = async (courseId) => {
        dispatch(setLoading(true))
        const response = await getFullDetailsOfCourse(courseId, token)
        console.log(response)
        setCourse(response)
        dispatch(setLoading(false))
    }

    useEffect(() => {
        params?.courseId && getCourseFullDetails(params?.courseId)
    }, [])

    return (
        <div className='mx-auto w-full text-center mt-10'>
            {getCourse && 
                <>
                    <div className='flex flex-col justify-center md:justify-evenly md:flex-row gap-4 md:gap-0'>
                        <div className='w-full md:w-1/2'>
                            <div className='text-xl md:text-2xl text-center'>{getCourse?.courseDetails?.courseName}</div>
                            <div className='w-full mt-2 text-richblack-100'>{getCourse?.courseDetails?.courseDescription}</div>
                        </div>
                        <div className='w-fit flex gap-4 border-2 border-white p-2 rounded-md mx-auto md:mx-0'>
                            <img src={getCourse?.courseDetails?.instructor?.image} className=' object-contain h-20' />
                            <div className='flex flex-col'>
                                <div className='flex justify-start'><span>Email : </span><span>{getCourse?.courseDetails?.instructor?.email}</span></div>
                                <div className='flex justify-start'><span>Name : </span><span>{getCourse?.courseDetails?.instructor?.firstName + getCourse?.courseDetails?.instructor?.lastName}</span></div>
                                <div className='flex justify-start'><span>Email : </span><span>{getCourse?.courseDetails?.instructor?.email}</span></div>
                            </div>
                        </div>
                    </div>
                    <div className=' flex flex-col items-start gap-1 mt-5 mg:mt-10'>
                            {
                                !getCourse?.courseDetails?.courseContent ? <></>
                                :
                                <>
                                {getCourse?.courseDetails?.courseContent.map((item,index)=>(
                                    <div className='w-full flex flex-col items-start border-2 border-white mt-7 rounded-lg p-2 overflow-hidden'>
                                        <div className='border-b-2 border-white w-full text-start py-2'>Chapter{index+1} [{item?.sectionName}]</div>
                                        <div className='flex flex-col mb-5 mt-2 pt-2 w-11/12 ml-5'>
                                            {
                                                item?.subSection?.map((subItem,Subindex)=>(
                                                    <div className='flex flex-col w-11/12 items-center lg:items-start gap-2'>
                                                        <div>Section{Subindex+1}: {subItem?.title}</div>
                                                        <div><ReactPlayer url={subItem?.videoUrl} controls={true} height={100} width={100} playing={false}/></div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ))}
                                </>
                            }
                    </div>
                </>
            }

        </div>
    )
}

export default CourseFullDetails