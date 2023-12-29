import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, fetchCourseCategories } from '../../../../../Services/operations/courseDetailsAPI';
import { setEditCourse, setStep } from '../../../../../Store/courseReducer';

const CourseInfoForm = () => {
    const {register,handleSubmit,reset,formState:{errors,isSubmitSuccessful},setValue,getValues} = useForm();
    const dispatch = useDispatch();
    const {course,editCourse} = useSelector((store)=>store.course)
    const{token} = useSelector((store)=>store.auth)
    const [loading, setLoading] = useState(false)
    const [courseCategories, setCourseCategories] = useState([]);


    const courseDeatilsSubmit = async(data)=>{
        try {
            const formData = new FormData();
            formData.append("courseName", data.courseName)
            formData.append("courseDescription", data.courseDescription)
            formData.append("price", data.price)
            formData.append("tag", data.tag)
            formData.append("whatYouWillLearn", data.whatYouWillLearn)
            formData.append("category", data.category )
            formData.append("instructions", data.instructions)
            formData.append("thumbnailImage", previewThumbnail)
            formData.append("status", 'Published')
            const result = await addCourseDetails(formData,token)
            console.log("New course : ",result)
            dispatch(setStep(2))
        } catch (error) {
            console.log(error)
        }
    }

    //-----> Uploading and previweing Image
    const inputImage = useRef()
    const handleClick = ()=>{
        inputImage.current.click()
    }
    const[previewThumbnail,setPreviewThumbnail] = useState(null);
    const ThumbnailUpload = (e)=>{
        try {
            const file = e.target.files[0];
            console.log(file);
            if (file) {
                setPreviewThumbnail(file);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }

    //--->fecth categories from DB
    const getCategories = async()=>{
        setLoading(true)
        const categories = await fetchCourseCategories();
        if(categories.length>0){
            setCourseCategories(categories);
        }
        setLoading(false);
    }

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                courseName:"",
                courseDescription:"",
                price:"",
                category:"",
                tag:"",
                whatYouWillLearn:"",
                instructions:""
            })
        }
        getCategories();
    },[isSubmitSuccessful,reset])
  return (
    <>
        <form onSubmit={handleSubmit(courseDeatilsSubmit)}>
            <div className=' flex flex-col gap-2 mb-7'>
                <label htmlFor='courseName' className='label-style text-richblack-5 text-sm'>Course Title<sup>*</sup></label>
                <input id='courseName' name='courseName' placeholder='Enter Course Title' type='text' className='form-style p-2 rounded-md bg-richblack-600 text-richblack-5' {...register('courseName',{required:true})}/>
                {
                    errors.courseName && (
                        <span className=' text-sm text-richblack-5'>
                                Enter course title
                        </span>
                    )
                }
            </div>
            <div className=' flex flex-col gap-2 mb-7'>
                <label htmlFor='courseDescription' className='label-style text-richblack-5 text-sm'> Course Short Description</label>
                <textarea id='courseDescription' name='courseDescription' type='text' placeholder='Enter Description' className='form-style p-2 rounded-md bg-richblack-600 text-richblack-5 h-36' {...register("courseDescription",{required:true})}/>
                {
                    errors.courseDescription && (
                        <span className=' text-sm text-richblack-5'>
                            Enter course Description
                        </span>
                    )
                }
            </div>
            <div className=' flex flex-col gap-2 mb-7'>
                <label htmlFor='price' className='label-style text-richblack-5 text-sm'>Price</label>
                <input id='price' name='price' type='Number' placeholder='Enter Price' className='form-style p-2 rounded-md bg-richblack-600 text-richblack-5' {...register("price",{required:true,valueAsNumber:true})}/>
                {
                    errors.price && (
                        <span className=' text-sm text-richblack-5'>
                            Enter course price
                        </span>
                    )
                }
            </div><div className=' flex flex-col gap-2 mb-7'>
                <label htmlFor='category' className='label-style text-richblack-5 text-sm'>Category</label>
                <select id='category' name='category' type='text' placeholder='Enter Category' className='form-style p-2 rounded-md bg-richblack-600 text-richblack-5' {...register("category",{required:true})}>
                    {
                        courseCategories.map((element,index)=>(
                            <option key={index} value={element._id}>
                                {element.name}
                            </option>
                        ))
                    }
                </select>
                {
                    errors.category && (
                        <span className=' text-sm text-richblack-5'>
                            Enter course category
                        </span>
                    )
                }
            </div>

            {/* Create a custom tag components */}
            <div className=' flex flex-col gap-2 mb-7'>
                <label htmlFor='tag' className='label-style text-richblack-5 text-sm'>Tag</label>
                <input id='tag' name='tag' type='text' placeholder='Choose a tag' className='form-style p-2 rounded-md bg-richblack-600 text-richblack-5' {...register("tag",{required:true})}/>
                {
                    errors.tag && (
                        <span className=' text-sm text-richblack-5'>
                            Enter course tag
                        </span>
                    )
                }
            </div>

            {/* Prevewing and Uploading the image */}
            <div className=' flex flex-col gap-2 mb-7'>
                <label htmlFor='thumbnail' className='label-style text-richblack-5 text-sm'> Course Thumbnail</label>
                <input id='thumbnail' name='thumbnail' type='file' onChange={ThumbnailUpload}  accept='image/png, image/gif, image/jpeg' className='hidden' ref={inputImage} required={true}/>
                {
                    errors.thumbnail && (
                        <span className=' text-sm text-richblack-5'>
                            Enter course course Thumbnail
                        </span>
                    )
                }
                <img src={previewThumbnail ? URL.createObjectURL(previewThumbnail) : ''} className='form-style p-2 rounded-md bg-richblack-600 text-richblack-500 h-32 text-center text-4xl object-contain' onClick={handleClick} alt='Upload Course Thumbnail'/>
            </div>
            <div className=' flex flex-col gap-2 mb-7'>
                <label htmlFor='whatYouWillLearn' className='label-style text-richblack-5 text-sm'>Benifits of the course</label>
                <input id='whatYouWillLearn' name='whatYouWillLearn' type='text' placeholder='Enter Benifits Of The Course' className='form-style p-2 rounded-md bg-richblack-600 text-richblack-5' {...register("whatYouWillLearn",{required:true})}/>
                {
                    errors.whatYouWillLearn && (
                        <span className=' text-sm text-richblack-5'>
                            Enter course Benifits Of The Course
                        </span>
                    )
                }
            </div><div className=' flex flex-col gap-2 mb-7'>
                <label htmlFor='instructions' className='label-style text-richblack-5 text-sm'> Course Short Description</label>
                <input id='instructions' name='instructions' type='text' placeholder='Enter instructions' className='form-style p-2 rounded-md bg-richblack-600 text-richblack-5' {...register("instructions",{required:true})}/>
                {
                    errors.instructions && (
                        <span className=' text-sm text-richblack-5'>
                            Enter course instructions
                        </span>
                    )
                }
            </div>
            <button type='submit' className='bg-yellow-50 text-black mt-10 py-2 px-4 rounded-full'>Next</button>
        </form>
    </>
  )
}

export default CourseInfoForm