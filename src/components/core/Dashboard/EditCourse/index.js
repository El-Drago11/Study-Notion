import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderStep from '../AddCourses/RenderStep';
import { getFullDetailsOfCourse } from '../../../../Services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../Store/courseReducer';

const EditCourse = () => {

    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {course} = useSelector((store)=>store.course);
    const {token} = useSelector((store)=>store.auth)
    const [loading,setLoading] = useState();

    useEffect(()=>{
        const populateCourseDeatils = async() =>{
            setLoading(true);
            const result = await getFullDetailsOfCourse(courseId,token);
            if(result?.courseDetails){
                dispatch(setEditCourse(true));
                dispatch(setCourse(result.courseDetails));
            }
            setLoading(false)
        }
        populateCourseDeatils()
    },[])
    if(loading){
        return(
            <p className='absolute mx-auto mt-10 text-4xl'>Loading.......</p>
        )
    }
  return (
    <div className=' flex flex-col items-center'>
        <h1 className=' text-2xl mt-5'>Edit Course</h1>
        <div className='flex flex-col bg-richblack-800 w-11/12 lg:w-[75%] mt-7 rounded-md mb-5 lg:mb-10'>
            {
                course ? (<RenderStep/>) : (<p>Course Not Found</p>)
            }
        </div>
    </div>
  )
}

export default EditCourse