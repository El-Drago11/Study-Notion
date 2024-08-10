import React from 'react'
import { useSelector } from 'react-redux'
import { TiTick } from "react-icons/ti";
import CourseInfoForm from './CourseInformation/CourseInfoForm';
import CourseBuildForm from './CourseBulider/CourseBuildForm';
import PublishCourse from './CourseBulider/PublishCourse';

const RenderStep = () => {
  const {step} = useSelector((store)=>store.course)
  const steps = [
    {
      id:1,
      title : 'Course Information',
    },
    {
      id:2,
      title : 'Course Builder'
    },
    {
      id:3,
      title : 'Publish'
    }
  ]

  return (
    <div>
        <div className='grid lg:grid-cols-3 mt-10'>
          {steps.map((element,index)=>(
            <>
              <div className={"flex flex-col items-center mx-auto"} key={index}>

                  <div className={`px-4 py-2 rounded-full ${element.id === step || element.id<step ?"border-2 border-yellow-50 text-yellow-50 bg-yellow-900" : "border-2 border-richblack-700 text-richblack-200 bg-richblack-800"} `}>
                    {step>element.id ? (<TiTick/>): (element.id)}
                  </div>

                  <div className={`${element.id===step || element.id<step ? "text-richblack-25" : "text-richblack-200"} mt-2`}>{element.title}</div>
              </div>
            </>
          ))}
        </div>
        <div className=' flex flex-col bg-richblack-800 py-5 px-10 mt-7 rounded-md mb-10'>
            {step===1 ? (<CourseInfoForm/>) : ""}
            {step===2 ? (<CourseBuildForm/>) : ""}
            {step===3 ? (<PublishCourse/>) : ""}
        </div>
    </div>
  )
}

export default RenderStep