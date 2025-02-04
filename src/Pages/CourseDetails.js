import React, { useEffect, useState } from 'react'
import IconBtn from '../components/common/IconBtn'
import { buyCourse } from '../Services/operations/buyCourse';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../Services/operations/courseDetailsAPI';
import toast from 'react-hot-toast';

const CourseDetails = () => {
  const { user } = useSelector((store) => store.profile)
  const { token } = useSelector((store) => store.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState();

  const handleBuyCourse = (token) => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        var dataDetails = await fetchCourseDetails(courseId);
        setCourseData(dataDetails.data[0]);
      } catch (error) {
        toast.error(error.message);
      }

    }
    fetchData();
  }, [courseId])

  return (
      <div className='w-full text-richblack-5  flex flex-col lg:flex-row justify-evenly p-4'>
        <div className='container'>
          <h1 className=' text-2xl lg:text-4xl text-center mt-4 mb-2 lg:mb-6 text-yellow-100'>{courseData?.courseName.toUpperCase()}</h1>
          <figure class="md:flex bg-slate-100 rounded-xl p-2 lg:p-8 md:p-0 dark:bg-slate-800 mt-0 lg:mt-4 border-2 border-white">
            <div className='w-[50%] mx-auto'>
              <img class="object-cover md:h-[100%] md:rounded-none rounded-full mx-auto" src={courseData?.thumbnail} alt="courseImage" />
            </div>
            <div class="text-left space-y-4 ml-0 lg:ml-4 p-4">
              <blockquote>
                <p class="text-lg font-medium">
                  {courseData?.courseDescription}
                </p>
              </blockquote>
              <figcaption class="font-medium">
                <div class="text-sky-500 dark:text-sky-400">
                  Achievement :  {courseData?.whatYouWillLearn}
                </div>
                <div className="text-slate-700 dark:text-slate-500">
                  What You Will learn :  
                  {courseData?.tag[0]?.split('+').map((item, index) => (
                    <button class="rounded-full mr-4 text-yellow-100" key={index}>{item}</button>
                  ))}
                </div>
                <div className=' text-richblack-5 mt-4'>
                  <IconBtn text={"Buy Course"} onclick={() => handleBuyCourse(token)} />
                </div>
              </figcaption>
            </div>
          </figure>
        </div>
        <div className='container mx-auto'>
          <h1 className=' text-2xl lg:text-4xl text-center mt-10 lg:mt-4 mb-2 lg:mb-6 text-yellow-100'>INSTRUCTOR PROFILE</h1>
          <figure class="md:flex bg-slate-100 rounded-xl p-1 lg:p-8 md:p-0 dark:bg-slate-800 mt-4 mx-auto w-fit border-2 border-white">
            <div className='w-auto'>
              <img class="w-24 h-24 rounded-full mx-auto" src={courseData?.instructor?.image} alt="courseImage" height='200' />
            </div>
            <div class="text-center md:text-left space-y-4 ml-4">
              <blockquote>
                <p class=" text-3xl font-medium">
                  {courseData?.instructor?.firstName + ' ' + courseData?.instructor?.lastName}
                </p>
              </blockquote>
              <figcaption class="text-lg lg:text-xl">
                <div class="text-sky-500 dark:text-sky-400">
                  Email :  {courseData?.instructor?.email}
                </div>
              </figcaption>
            </div>
          </figure>
        </div>
      </div>
  )
}

export default CourseDetails