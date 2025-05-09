import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../../Store/authReducer';
import toast from 'react-hot-toast';
import { getInstructorStudents } from '../../../../Services/operations/profileApi';

const YourStudents = () => {

    const dispatch = useDispatch();

    const [getCurrentPageNumber,setCurrentPageNumber] = useState(1);
    const [getTotalPageNumber,setTotalPageNumber] = useState(10);
    const [getSupportDesk, setSupportDesk] = useState([]);

    // const fetchNext = async()=>{
    //     if(getCurrentPageNumber<getTotalPageNumber){
    //         fetchPlayerDetails(getCurrentPageNumber+1);
    //         setCurrentPageNumber((prev)=>prev+1)
    //     }
    //     return;
    // }

    // const fetchPrevious = async()=>{
    //     if(getCurrentPageNumber>1){
    //         fetchPlayerDetails(getCurrentPageNumber-1);
    //         setCurrentPageNumber((prev)=>prev-1)
    //     }
    //     return;
    // }

    const fetchSupportDesk = async () => {
        dispatch(setLoading(true))
        const resp = await getInstructorStudents();
        setSupportDesk(resp)
        dispatch(setLoading(false))
        return;
    }

    useEffect(() => {
        fetchSupportDesk();
    }, [])

    return (
        <div className='w-full mt-7 flex flex-col items-center relative'>
            <div className='w-full text-4xl font-extrabold text-center'>Your Students</div>
            <table class="table-fixed w-11/12 text-center border-2 mt-10">
                <thead className='border-b-2 border-white'>
                    <tr className=' font-extrabold'>
                        <th className='border-r-2 border-white truncate py-4'>S.No</th>
                        <th className='border-r-2 border-white truncate py-4'>UserId</th>
                        <th className='border-r-2 border-white truncate py-4'>Status</th>
                        <th className='border-r-2 border-white truncate py-4'>Email</th>
                        <th className='border-r-2 border-white truncate py-4'>Name</th>
                        <th className='border-r-2 border-white truncate py-4'>Profile</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        getSupportDesk?.map((items,index) => (
                            <tr className='border-b-2 border-white font-semibold'>
                                <td className='border-r-2 border-white truncate py-4'>{index+1}</td>
                                <td className='border-r-2 border-white truncate py-4'>{items?._id}</td>
                                <td className={`border-r-2 border-white truncate py-4  cursor-pointer`}><button className={`${items?.approved ? " bg-caribbeangreen-400" : " bg-red-300"} p-2 rounded-full shadow-yellow-100 w-1/2 truncate`}>{items?.approved ? "Active" : "Inactive"}</button></td>
                                <td className='border-r-2 border-white truncate py-4'>{items?.email}</td>
                                <td className='border-r-2 border-white truncate capitalize py-4'>{items?.firstName + ' ' + items?.lastName}</td>
                                <td className='border-r-2 border-white truncate py-4 mx-auto'><img src={items?.image} className=' rounded-full h-10 w-10 mx-auto'/></td>
                            </tr>
                        ))
                    }
                   
                </tbody>
            </table>
            {/* <div className='w-11/12 my-4 flex justify-between'>
                <button className={`${getCurrentPageNumber<=1 ? 'bg-slate-700 cursor-not-allowed':"bg-red-600 py-2"} rounded-md px-4`} onClick={()=>fetchPrevious()}>Prev</button>
                <button className={`${getCurrentPageNumber>=getTotalPageNumber ? 'bg-slate-700 cursor-not-allowed':"bg-red-600 py-2"} py-2 rounded-md px-4`} onClick={()=>fetchNext()}>Next</button>
            </div> */}
        </div>
    )
}

export default YourStudents