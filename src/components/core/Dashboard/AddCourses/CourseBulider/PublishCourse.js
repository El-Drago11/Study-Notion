import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import {setStep, setEditCourse, setCourse, resetCourseState } from '../../../../../Store/courseReducer';
import { IoIosArrowBack } from "react-icons/io";
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails } from '../../../../../Services/operations/courseDetailsAPI';


const PublishCourse = () => {
    const {register,setValue,getValues,handleSubmit} = useForm();
    const dispatch = useDispatch();
    const {course} = useSelector((store)=>store.course)
    const {token} = useSelector((store)=>store.auth)
    const [loading,setLoading] = useState(false)
    const onSubmit = ()=>{
        handleCoursePublish()
    }
    const goBack=()=>{
        dispatch(setStep(2))
    }
    const goToCourses = () =>{
        dispatch(resetCourseState());
        // navigate to myCourses
    }
    const handleCoursePublish = async()=>{
        if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public")===true || (course?.status === COURSE_STATUS.DRAFT && getValues("public")===false)){
            //form is not updated so api will not call
            goToCourses();
            return;
        }
        
        const formData = new FormData();
        formData.append("courseId",course._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status",courseStatus)

        setLoading(true);
        const result = await editCourseDetails(formData,token);
        if(result){
            goToCourses();
        }
        setLoading(false);
    }

    useEffect(()=>{
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("public",true)
        }
    },[])

  return (
    <div className=' rounded-md border-{1px} bg-richblack-800 text-richblack-5'>
        <p className=' text-4xl font-bold mb-10'>Publish Course</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input type='checkbox' id='public' {...register("public")} className='bg-richblack-5 mr-2'/>
                <label htmlFor='public'>Make this Course Public</label>
            </div>
            <div className='flex gap-2 justify-between'>
                <button type='submit' className=' bg-richblack-600 text-richblack-5 mt-10 py-2 px-4 rounded-full flex flex-row items-center gap-1'onClick={()=>goBack()}><IoIosArrowBack/>BACK</button>
                <button disabled={loading} type='submit' className='bg-yellow-50 text-black mt-10 py-2 px-4 rounded-full flex flex-row items-center gap-1'>Save and Publish</button>
            </div>
        </form>
    </div>
  )
}

export default PublishCourse