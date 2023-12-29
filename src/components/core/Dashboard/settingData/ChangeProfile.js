import React, { useEffect, useRef, useState } from 'react'
import IconBtn from '../../../common/IconBtn'
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from 'react-redux'
import { updateProfilePic } from '../../../../Services/operations/profileApi'


const ChangeProfile = () => {

    const dispatch  = useDispatch();
    const { token } = useSelector((store) => store.auth)
    const { user } = useSelector((store) => store.profile)

    const fileInputRef = useRef(null);
    const handleClick =()=>{
        fileInputRef.current.click();
    }

    const [loading,setLoading] = useState(false)
    const [imageFile,setImageFile] = useState(null);
    const [previewImage , setPreviewImage] = useState(null);

    const handleFileChange = (e)=>{
        const file = e.target.files[0];
        console.log(file);
        if(file){
            setImageFile(file);
            setPreviewImage(file)
        }
    }

    const handleFileUpload = ()=>{
        try {
            console.log('Uploading...')
            setLoading(true)
            const formData = new FormData()
            formData.append("displayPicture ",imageFile)
            console.log("formData : ",formData)
            dispatch(updateProfilePic(formData,token)).then(()=>{
                setLoading(false)
            });
        } catch (error) {
            console.log("Error Message : ",error.message)
        }
    }

    const previewFile = (file)=>{
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend=()=>{
            setPreviewImage(reader.result)
        }
    }

    useEffect(()=>{
        if(imageFile){
            previewFile(imageFile)
        }
    },[imageFile])

    return (
        <div className=' grid md:grid-cols-8 sm:grid-cols-1 justify-items-start bg-richblack-800 p-6 rounded-md'>
            <img src={previewImage||user?.image} alt={user?.firstName} className='rounded-full h-16'/>
            <div className=' flex flex-col md:col-span-7 gap-2'>
                <p className='text-lg'>Change Profile Picture</p>
                <div className='grid grid-cols-2 gap-4'>
                    <input type='file' ref={fileInputRef} onChange={handleFileChange} className='hidden' accept='image/png, image/gif, image/jpeg' disabled={loading}/>
                    <button  disabled={loading} className=' rounded-md text-richblack-25 bg-richblack-400 py-2 px-3' onClick={handleClick}>Select</button>
                    <IconBtn text={loading?"Uploading...":"Upload"} onclick={handleFileUpload} disabled={!previewImage}>
                        {!loading &&(
                            <FiUpload className="text-lg text-richblack-900"/>
                        )}
                    </IconBtn>
                </div>
            </div>
        </div>
    )
}

export default ChangeProfile