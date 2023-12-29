import React from 'react'
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"


const Timeline = [
    {
        logo: logo1,
        heading : "LeaderShip",
        description:"Fully commited to successfully company"
    },
    {
        logo: logo2,
        heading : "Responsibility",
        description:"Student will alaways be our top priority"
    },
    {
        logo: logo3,
        heading : "Flexibility",
        description:"The ability to switch is an  important Skill"
    },
    {
        logo: logo4,
        heading : "Solve the Problem",
        description:"code your way to Solution"
    }
]

const TimelineSection = () => {
  return (
    <div>
        <div className='flex flex-row gap-15 items-center'>
            <div className='w-[45%] flex flex-col gap-11'> 
                {
                    Timeline.map((data,index)=>{
                        return(
                            <div className='flex flex-row mx-auto items-start' key={index}>
                                <div className='w-[20%] mx-auto'>
                                    <img src={data.logo}/>
                                </div>
                                <div className='w-[80%] mx-auto'>
                                    <h2 className='font-bold'>{data.heading}</h2>
                                    <p>{data.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='relative shadow-blue-200'>
                <img src={timelineImage} alt="TimelineImage" className='shadow-white object-cover h-fit'/>
                <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase p-5 translate-x-[20%] -translate-y-6'>
                    <div className='flex flex-row gap-5 items-center border-r-2 border-caribbeangreen-100 px-7'>
                        <div>
                            <p className='text-3xl font-bold'>10</p>
                            <p className='text-caribbeangreen-300 text-sm'>Years Of Experience</p>
                        </div>
                    </div>
                    <div className='flex flex-row gap-5 items-center px-7'>
                        <div>
                            <p className='text-3xl font-bold'>250</p>
                            <p className='text-caribbeangreen-300 text-sm'>Types of Courses</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TimelineSection