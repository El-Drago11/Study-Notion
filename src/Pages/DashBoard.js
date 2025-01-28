import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/Dashboard/Sidebar'
import { MdArrowCircleRight } from "react-icons/md";
import { MdArrowCircleLeft } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setSideBarOpen } from '../Store/profileReducer';

const DashBoard = () => {

  const {isSideBarOpen} = useSelector((store)=>store.profile)
  const dispatch = useDispatch();

  const toggleSidebar = ()=>{
    dispatch(setSideBarOpen())
  }


  return (
    <div className="h-[90vh] relative flex flex-row">
      <div
        className={`absolute top-2 left-2 lg:hidden text-richblack-5 text-2xl z-10 ${isSideBarOpen ? "opacity-0" : "opacity-100"
          } transition-opacity duration-500`}
      >
        <MdArrowCircleRight onClick={() => toggleSidebar()} />
      </div>

      <div
        className={`bg-gray-800 ${isSideBarOpen ? "w-[60%] opacity-100" : "w-0 opacity-0"
          } lg:opacity-100 lg:w-[20%] transition-all duration-500 ease-in-out overflow-hidden relative`}
      >
        <Sidebar/>
        <div className="absolute lg:hidden top-2 right-2 text-richblack-5 text-2xl">
          <MdArrowCircleLeft onClick={() => toggleSidebar()} />
        </div>
      </div>

      <div
        className={`overflow-auto ${isSideBarOpen ? "opacity-0 w-0" : "opacity-100 w-full"
          } lg:opacity-100 lg:w-[80%] h-full transition-all duration-500 ease-in-out`}
      >
        <div className="mx-auto max-w-maxContent h-full px-4">
          <Outlet />
        </div>
      </div>
    </div>

  )
}

export default DashBoard