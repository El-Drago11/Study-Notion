import React from 'react'
import instructor_img from '../../../assets/Images/Instructor.png'
import Highlight from './Highlight'
import CTAbuuton from './CTAbuuton'
import {AiOutlineArrowRight} from "react-icons/ai"
import "../../../App.css"

const Instructor = () => {
  return (
    <div className='w-11/12 max-w-maxContent items-center justify-center mx-auto text-white p-11'>
        <div className='flex flex-row items-center gap-32'>
            <img src={instructor_img} alt='instructor' className='StaticBgShadow'/>
            <div className='flex flex-col text-start w-[50%]'>
                <div>
                    <div className='text-3xl'><span>Become an</span><br/><Highlight text={"instructor"}/></div>
                    <div className='text-sm text-pure-greys-300 mt-4'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.Start Teaching Today
                    </div>
                    <div className='w-fit mt-16'>
                        <CTAbuuton text={<div className='flex flex-row items-center'><span className='mr-2'>Start Teaching Today</span><span><AiOutlineArrowRight/></span></div>} active={true} linkto={'/signup'}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Instructor