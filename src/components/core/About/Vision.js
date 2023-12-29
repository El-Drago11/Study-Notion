import React from 'react'
import HighlightText from '../Home/HighlightText'
import foundingStory from '../../../assets/Images/FoundingStory.png'

const Vision = () => {
  return (
    <>
        <div className='flex flex-row mx-auto gap-24 justify-around items-center'>
            <div className='w-[40%] mx-auto'>
                <div className='text-4xl rounded-full font-bold bg-gradient-to-b from-caribbeangreen-100 to-caribbeangreen-600 text-transparent bg-clip-text'>
                    Our Founding Story
                </div>
                <p className='text-richblack-200 text-sm mt-4 line-clamp-6'>
                    Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                    As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                </p>
            </div>
            <div className='w-[40%] mx-auto'>
            <img src={foundingStory} alt='foundig Story'/>
            </div>
        </div>
        <div className='flex flex-row mx-auto gap-24 items-center justify-around mb-20'>
            <div className='w-[40%] mx-auto'>
                <div className='text-4xl rounded-full font-bold bg-gradient-to-b from-pink-100 to-pink-600 text-transparent bg-clip-text'>
                    Our Founding Story
                </div>
                <p className=' text-richblack-200 text-sm mt-4 line-clamp-5'>
                    With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                </p>
            </div>
            <div className='w-[40%] mx-auto'>
                <div className='text-4xl rounded-full font-bold bg-gradient-to-b from-blue-300 to-blue-100 text-transparent bg-clip-text'>
                    Our Mission
                </div>
                <p className='text-richblack-200 text-sm mt-4 line-clamp-5'>
                our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                </p>
            </div>
        </div>
    </>
  )
}

export default Vision