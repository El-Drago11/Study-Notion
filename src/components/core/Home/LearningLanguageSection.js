import React from 'react'
import Highlight from './Highlight'
import knowYourProgress from '../../../assets/Images/Know_your_progress.png'
import planYourLesson from '../../../assets/Images/Plan_your_lessons.png'
import compareWithOthers from '../../../assets/Images/Compare_with_others.png'
import CTAbuuton from './CTAbuuton'


const LearningLanguageSection = () => {
  return (
    <div className='w-11/12 max-w-maxContent flex flex-col mx-auto items-center mt-[130px]'>
        <div className='text-4xl text-center w-full lg:w-[70%]'>
            <span>Your swiss Knife for </span><span><Highlight text={"learning any language"}/></span>
        </div>

        <div  className='text-sm text-center mt-4 w-full lg:w-[70%]'>
        Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.
        </div>

        <div className='flex flex-row items-center justify-center mt-5 mx-auto'>
            <img src={knowYourProgress} alt='knowYourProgress' className='-mr-10 lg:-mr-28 hover:scale-95 transition-x duration-200 h-[9rem] md:h-[15rem] lg:h-auto'/>
            <img src={compareWithOthers} alt='compareWithOthers' className='-mr-10 lg:-mr-32 hover:scale-95 transition-x duration-200 h-[12rem] md:h-[15rem] lg:h-auto'/>
            <img src={planYourLesson} alt='planYourLesson' className='hover:scale-95 transition-x duration-200 h-[10rem] md:h-[15rem] lg:h-auto'/>
        </div>

        <div className='mb-5'>
            <CTAbuuton text={"Learn More"} active={true} linkto={"/signup"}/>
        </div>
    </div>
  )
}

export default LearningLanguageSection