import React, { useState } from 'react'
import  {sidebarLinks} from '../../../data/dashboard-links'
import { userLogout } from '../../../Services/operations/authApi'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import SidebarData from './SidebarData'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../../common/ConfirmationModal'

const Sidebar = () => {

    const {user,loading:profileLoading} = useSelector((store)=>store.profile)
    const {loading:authLoading} =  useSelector((store)=>store.auth)
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[confirmationModal,setConfirmationModal] = useState(null);

    // if(authLoading || profileLoading){
    //     return(
    //         toast.loading("Please wait")
    //     )
    // }

  return (
    <div className='flex flex-col w-full border-r-[1px] border-r-richblack-600 h-full bg-richblack-700 py-10'>
        <div className=' flex flex-col border-b-2 border-b-richblack-5 pb-10'>
            {
                sidebarLinks.map((element)=>{
                    if(element?.type && user?.accountType !== element.type) return null;
                    return(
                        <SidebarData element={element} iconName={element.icon} key={element.id}/>
                    )
                })
            }
        </div>
        <div className='flex flex-col pt-10 gap-y-4'>
            <SidebarData element={{name:"Setting",path:"dashboard/settings"}} iconName={"VscSettingsGear"}/> 
            <button onClick={()=>setConfirmationModal({
                text1:"Are you sure ?",
                text2:"You will be logged out of your account",
                btn1Text:"Logout",
                btn2Text:"Cancel",
                btn1Handler:()=>dispatch(userLogout(dispatch,navigate)),
                btn2Handler:()=>setConfirmationModal(null)
            })} className=' text-sm font-medium text-richblack-5 items-center'>
                <div className='flex flex-row items-start gap-x-2 md:px-4'>
                    <VscSignOut className=' text-lg'/>
                    <span>Logout</span>
                </div>
            </button>
        </div>

        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default Sidebar