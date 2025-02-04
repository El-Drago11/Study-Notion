import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { formattedDate } from '../../../../utils/dateFormatter';
import { COURSE_STATUS } from '../../../../utils/constants';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { deleteCourse, fetchInstructorCourses } from '../../../../Services/operations/courseDetailsAPI';
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const CoursesTable = ({courses,setCourses}) => {

    const dispatch = useDispatch();
    const {token} = useSelector((store)=>store.auth);
    const [loading,setLoading] = useState(false);
    const [confirmationModal,setConfirmationModal] = useState(null);
    const navigate = useNavigate();

    const handleCourseDelete = async(courseId)=>{
        setLoading(true);
        await deleteCourse({courseId:courseId},token); 
        const result = await fetchInstructorCourses(token);
        if(result){
            setCourses(result)
        }
        setConfirmationModal(null);
        setLoading(false);
    }

  return (
    <div className=' text-richblack-5 mt-7'>
        <Table>
            <Thead>
            <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              Courses
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Duration
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Price
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Actions
            </Th>
          </Tr>
            </Thead>
            <Tbody>
                {courses.length === 0 ? <Tr><Td>No Course Found</Td></Tr> :
                    (
                        courses.map((course)=>(
                            <Tr key={course._id} className='flex flex-row gap-x-10 border-b border-richblack-800 px-6 py-8'>
                                <Td className='flex flex-1 gap-x-4'>
                                    <img src={course?.thumbnail} className='h-[148px] rounded-lg object-cover'/>
                                    <div className='flex flex-col'>
                                        <p>{course?.courseName}</p>
                                        <p>{course?.courseDescription}</p>
                                        <p>Created :</p>
                                        <p className='text-yellow-25 font-semibold'>{course?.status === COURSE_STATUS.DRAFT ?
                                         (<p>{COURSE_STATUS.DRAFT}</p>):
                                         (<p>{COURSE_STATUS.PUBLISHED}</p>)
                                         }</p>
                                    </div>
                                </Td>
                                <Td className="text-sm font-medium text-richblack-100">3h : 45min</Td>
                                <Td className="text-sm font-medium text-richblack-100">{course?.price}</Td>
                                <Td className="text-sm font-medium text-richblack-100">
                                    <button disabled={loading} className='mr-2' onClick={()=>{navigate(`/dashboard/edit-course/${course._id}`)}}><MdOutlineEdit /></button>
                                    <button disabled={loading} onClick={()=>{
                                        setConfirmationModal({
                                            text1:"Do you want to delete this course",
                                            text2:"All the data realted to it will be deleted",
                                            btn1Text:"Delete",
                                            btn2Text:"Cancel",
                                            btn1Handler: !loading ? ()=>handleCourseDelete(course._id) : ()=>{},
                                            btn2Handler: ()=>setConfirmationModal(null)
                                        })
                                    }}><RiDeleteBin5Line /></button>
                                </Td>
                            </Tr>
                        ))
                    )
                }
            </Tbody>
        </Table>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default CoursesTable