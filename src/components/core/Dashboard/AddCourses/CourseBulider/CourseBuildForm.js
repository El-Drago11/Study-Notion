import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { NestedView } from './NestedView';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import {setStep, setEditCourse, setCourse } from '../../../../../Store/courseReducer';
import toast from 'react-hot-toast';
import { createSection, createSubSection, updateSection } from '../../../../../Services/operations/courseDetailsAPI';

const CourseBuildForm = () => {
    const dispatch = useDispatch();
    const {register, handleSubmit , setValue, formState:{errors}} = useForm();
    const [editSectionName , setEditSectionName] = useState(false);
    const {course} = useSelector((store)=>store.course)
    const {token} = useSelector((store)=>store.auth)
    const [loading,setLoading] = useState(false)
    const cancelEdit = () =>{
        setEditSectionName(false);
        setValue("sectionName",""); 
    }
    const goBack=()=>{
        dispatch(setStep(1))
        dispatch(setEditCourse(true))
    }
    const goNext = ()=>{
        if(course?.courseContent.length===0){
            toast.error("Please add atleast one section")
            return;
        }
        if(course?.courseContent?.some((section)=>section?.subSection?.length===0)){
            toast.error("Please add atleast one section")
            return;
        }
        else{
            dispatch(setStep(3))
        }
    }
    const onSubmitCoursedata = async(data) =>{
        setLoading(true);
        let result;
        if(editSectionName){
            result = await updateSection(
                {
                    sectionName : data.sectionName,
                    sectionId : editSectionName,
                    courseId : course._id
                },token
            )
        }else{
            result = await createSection(
                {
                    sectionName : data.sectionName,
                    courseId : course._id
                },token
            )
        }
        // update the course and courseSection in db
        if(result){
            dispatch(setCourse(result));
            setEditSectionName(false);
            setValue("sectionName","");
        }
        setLoading(false);
    }
    const handleChangeSection =(sectionId,sectionName)=>{
        if(editSectionName===sectionId){
            cancelEdit();
        }
        setEditSectionName(sectionId);
        setValue("sectionName",sectionName);
    }
  return (
    <div className='text-white'>
        <p className=' text-3xl mb-4'>Course Builder</p>
        <form onSubmit={handleSubmit(onSubmitCoursedata)}>
            <label className='text-lg' htmlFor='sectionName'>Section Name</label>
            <input id='sectionName' placeholder='Add section Name'
            {...register("sectionName",{required:true})}
            className='w-full rounded-md p-2 mt-2 bg-richblack-600'/>
            {errors.sectionName && (<span> section name is required</span>)}
            <div className='flex gap-4 items-baseline'>
                <button className='bg-yellow-50 text-black mt-5 py-2 px-4 rounded-full flex flex-row items-center gap-2' onClick={()=>toast.success("Please wait")}><FaPlus/>{editSectionName ? "Edit section" : "Create Section" }</button>
                {editSectionName ? <button className=' text-white mt-5 px-4 rounded-full flex flex-row items-center border-b-2 border-white' onClick={()=>cancelEdit()}>Cancel Edit</button> : ""}
            </div>
        </form>
        {
            course.length > 0 && (
                <NestedView handleChangeSection={handleChangeSection}/>
            )
        }
        <NestedView handleChangeSection={handleChangeSection}/>
        <div className='flex gap-2 justify-end'>
            <button type='submit' className=' bg-richblack-400 text-black mt-10 py-2 px-4 rounded-full flex flex-row items-center gap-1'onClick={()=>goBack()}><IoIosArrowBack/>BACK</button>
            <button type='submit' className='bg-yellow-50 text-black mt-10 py-2 px-4 rounded-full flex flex-row items-center gap-1' onClick={()=>goNext()}>Next<IoIosArrowForward /></button>
        </div>
    </div>
  )
}

export default CourseBuildForm