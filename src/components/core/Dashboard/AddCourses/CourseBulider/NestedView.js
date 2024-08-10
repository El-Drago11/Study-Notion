import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import ConfirmationModal from '../../../../common/ConfirmationModal';
import { deleteSection, deleteSubSection } from '../../../../../Services/operations/courseDetailsAPI';
import { LiaGripLinesVerticalSolid } from "react-icons/lia";
import { MdArrowDropDown } from "react-icons/md";
import { IoAddSharp } from "react-icons/io5";
import toast from 'react-hot-toast';
import { setCourse } from '../../../../../Store/courseReducer';
import SubSectionModal from './SubSectionModal';

export const NestedView = ({handleChangeSection}) => {
    const {course} = useSelector((store)=>store.course)
    const {token} = useSelector((store)=>store.auth)
    const dispatch = useDispatch();

    const[addSubsection,setAddSubsection] = useState(null);
    const[viewSubsection,setViewSubsection] = useState(null);
    const[editSubsection,setEditSubsection] = useState(null);

    const [confirmationModal,setConfirmationModal] = useState(null);
    
    const handleDeleteSection = async(sectionId) =>{
      const result = await deleteSection({sectionId,courseId:course?._id,token})
      if(result){
        toast.success("Section Deleted Successfully")
        dispatch(setCourse(result))
      }else{
        toast.error("Unable to delete section");
      }
      setConfirmationModal(null);
    }
    const handleDeleteSubSection = async(subSectionId,sectionId)=>{
      const result = await deleteSubSection({subSectionId,sectionId,token})
      if(result){
        const updatedCourseContent = course.courseContent.map((section)=>section._id === sectionId ? result : section);
        const updatedCourse = {...course, courseContent:updatedCourseContent}
        dispatch(setCourse(updatedCourse))
        toast.success("SubSection Deleted Successfully")
      }else{
        toast.error("Unable to delete SubSection");
      }
      setConfirmationModal(null);
    }
  return (
    <div className=' text-richblack-800'>
      <div className='rounded-lg bg-richblack-700 p-6 px-8 text-richblack-5 mt-10'>
        {/* Section */}
        {course?.courseContent?.map((section)=>(
          <details key={section._id} open className='mb-10'>
            <summary className='flex items-center justify-between gap-x-3 border-b-2 mb-4'>
              <div className='flex gap-x-4'>
                <RxDropdownMenu />
                <p>{section.sectionName}</p>
              </div>
              <div className='flex gap-2'>
                <button onClick={()=>{handleChangeSection(section?._id,section?.sectionName)}}><MdOutlineEdit /></button>
                <button onClick={()=>{setConfirmationModal({
                  text1:"Are you sure ?",
                  text2:`You are deleting the section ${section?.sectionName} section`,
                  btn1Text:"Delete",
                  btn2Text:"Cancel",
                  btn1Handler:()=>handleDeleteSection(section._id),
                  btn2Handler:()=>setConfirmationModal(null)
                })}}><RiDeleteBin5Line /></button>
                <span><LiaGripLinesVerticalSolid /></span>
                <span><MdArrowDropDown /></span>
              </div>
            </summary>
              {/* subSection */}
              {section?.subSection?.map((subSection)=>(
                <div key={subSection._id} onClick={()=>setViewSubsection(subSection)} className='flex items-center justify-between gap-x-3 border-b-2 mb-4'>
                  <div className='flex gap-x-4'>
                    <p>{subSection?.title}</p>
                  </div>
                  <div className='flex gap-2' onClick={(e)=>e.stopPropagation()}>
                    <button onClick={()=>{setEditSubsection({...subSection,sectionId: section._id})}}><MdOutlineEdit /></button>
                    <button onClick={()=>{setConfirmationModal({
                      text1:"Are you sure ?",
                      text2:`You are deleting the ${subSection?.title} sub-section`,
                      btn1Text:"Delete",
                      btn2Text:"Cancel",
                      btn1Handler:()=>handleDeleteSubSection(subSection._id,section._id),
                      btn2Handler:()=>setConfirmationModal(null)
                    })}}><RiDeleteBin5Line /></button>
                  </div>
                </div>
              ))}
              <button className='flex gap-x-4 text-yellow-50 mb-4' onClick={()=>setAddSubsection(section._id)}>
                <span><IoAddSharp /></span>
                Add Lecture
              </button>
            </details>
        ))}
      </div>
      {/* Modal Display */}
      {addSubsection ? (
        <SubSectionModal
          modalData={addSubsection}
          setModalData={setAddSubsection}
          add={true}
        />
      ) : viewSubsection ? (
        <SubSectionModal
          modalData={viewSubsection}
          setModalData={setViewSubsection}
          view={true}
        />
      ) : editSubsection ? (
        <SubSectionModal
          modalData={editSubsection}
          setModalData={setEditSubsection}
          edit={true}
        />
      ) : (
        <></>
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}
