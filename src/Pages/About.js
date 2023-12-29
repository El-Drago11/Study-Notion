import React from 'react'
import Highlight from '../components/core/Home/Highlight'
import Banner1 from '../assets/Images/aboutus1.webp'
import Banner2 from '../assets/Images/aboutus2.webp'
import Banner3 from '../assets/Images/aboutus3.webp'
import Quote from '../components/core/About/Quote'
import Vision from '../components/core/About/Vision'
import Stats from '../components/core/About/Stats'
import LearningGrid from '../components/core/About/LearningGrid'
import ContactForm from '../components/core/About/ContactForm'

export const About = () => {
  return (
    <div className=' mx-auto flex flex-col items-center'>
        <section>
            <div className='text-center flex flex-col mx-auto items-center bg-richblack-800 '>
                <header className=' text-richblack-25 text-4xl w-[50%] mt-20'>
                    <span> Driving Innovation in Online Education for a </span>
                    <Highlight text={"Brighter Future"}/>
                </header>
                <p className=' text-richblack-200 w-[50%] mt-5'>
                    Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                </p>
                <div className=' flex flex-row translate-y-16 gap-7'>
                    <img src={Banner1} alt='aboutUs image1'/>
                    <img src={Banner2} alt='aboutUs image2'/>
                    <img src={Banner3} alt='aboutUs image3'/>
                </div>
            </div>
        </section>
        <section>
            <div className='flex flex-col items-center mx-auto text-center mt-10 mb-10'>
                <Quote/>
            </div>
        </section>
        <section>
            <div className=' flex flex-col mx-auto text-richblack-300 items-center w-11/12 max-w-maxContent gap-24'>
                <Vision/>
            </div>
        </section>
        <section className='md:w-[90%]'>
            <Stats/>
        </section>
        <section className='gap-5 md-11/12 max-w-maxContent'>
            <LearningGrid/>
            <ContactForm/>
        </section>
        
    </div>
  )
}
