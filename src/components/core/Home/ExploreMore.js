import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import Highlight from './Highlight'
import CoursesCard from './CoursesCard'

const tabsName = [
    "Free","New to coding","Most popular","Skills paths","Career paths"
]

const ExploreMore = () => {

    const [currTab,setCurrentTab] = useState(tabsName[0])
    const [courses , setCourses] = useState(HomePageExplore[0].courses)
    const [currentCard , setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCards = (value)=>{
        setCurrentTab(value);
        const result = HomePageExplore.filter((course)=>course.tag===value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading)
    }
  return (
    <div className='w-11/12 max-w-maxContent flex flex-col'>
        <div className='text-4xl font-semibold text-center'>Unlock the {<Highlight text={"Power of Code"}/>}</div>
        <div className=' text-lg text-center text-richblack-200 mt-3'>Learn To Build any thing you can imagine</div>
        {/* tab */}
        <div className='mx-auto items-center flex flex-row mt-11 bg-richblack-800 rounded-full my-auto px-2 py-2'>
                {tabsName.map((element,index)=>{
                    return(
                        <div className={`text-sm text-center items-center ${currTab===element ? "bg-richblack-900 text-richblack-5 font font-medium":"text-richblack-200"} rounded-full hover:bg-richblack-700 hover:text-richblack-5 border-r-2 border-richblack-50 px-7 py-1`} key={index} onClick={()=>setMyCards(element)}>
                            {element}
                        </div>
                    )
                })}
        </div>
        {/* cardComponent */}
        <div className='justify-between mx-auto items-center flex flex-row gap-11 w-full translate-y-24'>
                {courses.map((element,index)=>{
                    return(
                        <CoursesCard key={index} cardData={element}/>
                    )
                })}
        </div>
    </div>
  )
}

export default ExploreMore