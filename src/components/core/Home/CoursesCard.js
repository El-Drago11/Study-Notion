import React from 'react'
import '../../../App.css'

const CoursesCard = ({cardData}) => {
    return(
        < div className='CardBgShadow flex flex-col text-left bg-richblack-800 p-5 w-[30%] hover:scale-95 transition-x duration-200 text-richblack-5 hover:bg-white hover:text-richblack-900'>
            <div className='text-2xl mt-5'>
                {cardData.heading}
            </div>
            <div className='text-lg text-richblack-400 mt-3 mb-10'>
                {cardData.description}
            </div>
            <div className='flex flex-row justify-between p-2 text-richblack-300  border-dashed border-t-2 border-richblack-500'>
                <div>
                    {cardData.level}
                </div>
                <div>
                    {cardData.lessionNumber}
                </div>
            </div>
        </div>
    )
}

export default CoursesCard