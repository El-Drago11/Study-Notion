import React from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineArrowRight} from "react-icons/ai"
import Highlight from '../components/core/Home/Highlight'
import CTAbuuton from '../components/core/Home/CTAbuuton'
import banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/Home/CodeBlocks'
import TimelineSection from '../components/core/Home/TimelineSection'
import LearningLanguageSection from '../components/core/Home/LearningLanguageSection'
import Instructor from '../components/core/Home/Instructor'
import Footer from '../components/common/Footer'
import ExploreMore from '../components/core/Home/ExploreMore'

const Home = () => {
  return (
    <div>
        {/* section1 */}
        <div  className='relative mx-auto flex flex-col w-11/12 items-center text-white max-w-maxContent justify-between h-fit mt-4'>

            {/* buuton */}
                <div className=' mt-16 p-2 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-100 transition-all duration-200 hover:scale-95 w-fit shadow-richblack-100 z-0'>
                    <Link to={"/signup"}>
                        <div className=' flex  items-center gap-2 rounded-full transition-all duration-200 group-hover:bg-richblack-900 py-[3px]'>
                            <p>Become an instructor</p>
                            <AiOutlineArrowRight/>
                        </div>
                    </Link>
                </div>
            

            {/* heading */}
            <div className='text-center text-white text-4xl mt-7 z-0'>
                Empower Your Future with <Highlight text={"Coding Skill"}/>
            </div>

            {/* subHeading */}
            <div className='text-center text-richblack-100 w-[50%] mt-3 z-0'>
                <p>Learning to write programs stretches your mind, and helps you think better, creates a way of thinking about things that I think is helpful in all domains</p>
            </div>

            {/* button */}
            <div className='flex flex-row gap-7 mt-8'>
                <CTAbuuton text="Learn more" active = {true} linkto={"/signup"}/>
                <CTAbuuton text="Book a Demo" active = {false} linkto={"/login"}/>
            </div>

            {/* vedioBanner */}
            <div className='mx-auto my-12 shadow-blue-200 '>
                <video muted autoPlay loop>
                    <source src={banner} type='video/mp4'/>
                </video>
            </div>

            {/* codeSection1 */}
            <div className='flex flex-row justify-center'>
                    <CodeBlocks position={"lg:flex-row"} heading={<span>Unlock Your {<Highlight text={"Coding Potential "}/>}with our Online Course</span>} subheading={"Programming today is a race between software engineers striving to build bigger and better idiot-proof programs, and the universe trying to build bigger and better idiots. So far, the universe is winning."} 
                    ctabtn1={
                        {
                            text:"Try it yourSelf",
                            active:true,
                            linkto:"/signup"
                        }
                    }
                    ctabtn2={
                        {
                            text:"Learn More",
                            active:false,
                            linkto:"/login"
                        }
                    }
                    codeBlock={`<!DOCTYPE html>
                    <html>
                    <body>
                        <h1>My First Heading</h1>
                        <p>My first paragraph.</p>
                        <footer>
                            <ul>
                                <li>GET help</li>
                            </ul>
                        </footer>
                    </body>
                    </html>`}
                    codeColor={"text-yellow-25"}
                    backgroungGradient={"bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"}/>
            </div>

            {/* codesection-2 */}
            <div className='flex flex-row justify-center'>
                    <CodeBlocks position={"lg:flex-row-reverse"} heading={<span>Start {<Highlight text={"Coding in Seconds"}/>} with our online Courses</span>} subheading={"The future of e-Learning is wide open! Learning doesn’t just happen during business hours in the office or in the classroom. It happens everywhere through a number of different channels."} ctabtn1={
                        {
                            text:"Continue lesson",
                            active:true,
                            linkto:"/signup"
                        }
                    }
                    ctabtn2={
                        {
                            text:"Learn More",
                            active:false,
                            linkto:"/login"
                        }
                    }
                    codeBlock={`<!DOCTYPE html>
                    <html>
                    <body>
                        <h1>My First Heading</h1>
                        <p>My first paragraph.</p>
                        <footer>
                            <ul>
                                <li>GET help</li>
                            </ul>
                        </footer>
                    </body>
                    </html>`}
                    codeColor={"text-yellow-25"}
                    />
            </div>
            <ExploreMore/>
        </div>
        {/* section-2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>
                    <div className='homepage_bg h-[333px]'>
                            <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto justify-center'>
                                <div className='h-[145px]'></div>
                                <div className='flex flex-row gap-7 text-white'>
                                    <CTAbuuton text={<div className='flex gap-2 items-center'><span>Explore Full Catalog</span><span><AiOutlineArrowRight/></span></div>} active={true} linkto={'/login'}/>
                                    <CTAbuuton text={"Learn More"} active={false} linkto={'/signup'}/>
                                </div>
                            </div>
                    </div>
                    <div className='flex flex-col w-11/12 max-w-maxContent mx-auto items-center justify-between gap-7 h-auto'>
                        <div className='flex flex-row gap-12 p-2 items-center'>
                            <div className='text-black font-inter text-3xl w-[40%] mx-auto'>
                                <span className='font-bold'>Get the Skills you need for a <br/></span><span><Highlight text={"job that is in demands"}/></span>
                            </div>
                            <div className='w-[50%] mx-auto font-bold'>
                                <p>
                                    The studyNotion is the Modern school of Coding. Where You get what need to required
                                </p>
                                <div className='w-[40%] items-center my-5'>
                                    <CTAbuuton  text={"Learn More"} active={true} linkto={'/signup'}/>
                                </div>
                            </div>
                        </div>
                        <TimelineSection/>
                        <LearningLanguageSection/>
                    </div>
        </div>
        {/* section-3 */}
        <Instructor/>

        {/* section-4 */}
        <Footer/>
    </div>
  )
}

export default Home