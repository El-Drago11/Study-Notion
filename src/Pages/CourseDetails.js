import React from 'react'
import IconBtn from '../components/common/IconBtn'
import { buyCourse } from '../Services/operations/buyCourse';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const CourseDetails = () => {
    const {user} = useSelector((store)=>store.profile)
    const {token} = useSelector((store)=>store.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId} = useParams();

    const handleBuyCourse = (token) =>{
        if(token){
            buyCourse(token,[courseId],user,navigate,dispatch);
            return;
        }
    }

  return (
    <div className=' text-richblack-5'>
        <IconBtn text={"Buy Course"} onclick={()=>handleBuyCourse(token)}/>
    </div>
  )
}

export default CourseDetails