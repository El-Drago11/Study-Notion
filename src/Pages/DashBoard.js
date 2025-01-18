import React from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/Dashboard/Sidebar'

const DashBoard = () => {

  const {loading:profileLoading} = useSelector((store)=>store.profile)
  const {loading:authLoading} =  useSelector((store)=>store.auth)

  return (
    <div className='h-[90vh] relative flex flex-row'>
        <Sidebar/>
        <div className='overflow-auto w-[80%] h-full'>
            <div className='mx-auto max-w-maxContent h-full px-4'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default DashBoard