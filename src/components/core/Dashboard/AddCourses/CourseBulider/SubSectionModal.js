import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../Services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../Store/courseReducer';
import { IoMdClose } from "react-icons/io";
import Upload from '../../../../common/Upload';

const SubSectionModal = ({modalData,setModalData,add=false,view=false,edit=false}) => {
    const {register,handleSubmit,setValue,getValues,formState:{errors}} = useForm();
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const {course} = useSelector((store)=>store.course)
    const {token} = useSelector((store)=>store.auth);

    const isFormUpdated = ()=>{
        const currValues = getValues();
        if(currValues.lectureTitle !== modalData.title || currValues.lectureDesc !== modalData.description || currValues.lectureVideo !== modalData.videoUrl){
            return false;
        }else{
            return true;
        }
    }

    const handleEditSubSection = async()=>{
        view(false);
        const currValues = getValues();
        const formData = new FormData();
        formData.append("sectionId",modalData.sectionId);
        formData.append("subsectionId", modalData._id);
        
        if(currValues.lectureTitle !== modalData.title){
            formData.append("title",currValues.lectureTitle);
        }
        if(currValues.lectureDesc !== modalData.description){
            formData.append("description",currValues.lectureDesc);
        }
        if(currValues.lectureVideo !== modalData.videoUrl){
            formData.append("video",currValues.lectureVideo);
        }
        setLoading(true);
        const result = await updateSubSection(formData,token);
        if(result){
            const updatedCourseContent = course.courseContent.map((section)=>section._id === modalData.sectionId ? result : section);
            const updatedCourse = {...course, courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);
    }

    const onSubmit = async(data)=>{
        if(view) return;
        if(edit){
            if(!isFormUpdated){
                toast.error("No Changes Made to the form");
            }else{
                handleEditSubSection();
            }
            return;
        }
        const formData = new FormData();
        formData.append("sectionId",modalData);
        formData.append("title",data.lectureTitle);
        formData.append("description",data.lectureDesc);
        formData.append("video",data.lectureVideo)

        const result = await createSubSection(formData,token);

        if(result){
            const updatedCourseContent = course.courseContent.map((section)=>section._id === modalData ? result : section);
            const updatedCourse = {...course, courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);
    }

    useEffect(()=>{
        if(view || edit){
            setValue("lectureTitle",modalData.title);
            setValue("lectureDesc",modalData.description)
            setValue("lectureVideo",modalData.videoUrl)
            setLoading(true);
        }
    },[])

  return (
    <div>
        <div className=' bg-richblack-800 rounded-md text-richblack-5 mt-5'>
            <div className=' flex items-center justify-between mt-4 text-3xl font-bold'>
                <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
                <button onClick={()=>setModalData(null)}><IoMdClose /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className=' mt-4 text-lg flex flex-col gap-4'>
                <Upload name="lectureVideo" label="lectureVideo" register={register} setValue={setValue} errors={errors} video={true} viewData= {view ? modalData.videoUrl: null} editData={edit ? modalData.videoUrl:null}/>

                <div className=' flex flex-col gap-2'>
                    <label>Lecture Title</label>
                    <input id='lectureTitle' placeholder='enter lecture title' {...register("lectureTitle",{required:true})} className='w-full p-2 text-richblack-800' />
                    {errors.lectureTitle && (<span>
                        Lecture title is required
                    </span>)}
                </div>
                <div>
                    <label>Description</label>
                    <textarea id='lectureDesc' placeholder='Enter the decription of the lecture' {...register("lectureDesc",{required:true})} className='w-full text-richblack-800' rows={4}/>
                    {errors.lectureDesc && (<span>Description is Required</span>)}
                </div>
                {!view && (<div>
                    <button className='flex gap-x-4 text-richblack-900 mb-4 bg-yellow-50 rounded-lg py-2 px-3'>
                        { edit ? "Save Changes" : "Save"}
                    </button>
                </div>)}
            </form>
        </div>
    </div>
  )
}

export default SubSectionModal