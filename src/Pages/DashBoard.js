import React from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/Dashboard/Sidebar'

const DashBoard = () => {

  const {loading:profileLoading} = useSelector((store)=>store.profile)
  const {loading:authLoading} =  useSelector((store)=>store.auth)

  return (
    <div className='relative flex flex-row min-h-screen'>
        <Sidebar/>
        <div className='h-screen overflow-auto w-[80%]'>
            <div className='mx-auto w-11/12 max-w-maxContent'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default DashBoard