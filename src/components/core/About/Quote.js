import React from 'react'
import Highlight from '../Home/Highlight'
import HighlightText from '../Home/HighlightText'

const Quote = () => {
  return (
    <div className='text-richblack-25 text-center w-11/12 lg:w-[70%] text-4xl mt-20 lg:mt-32 mb-11 mx-auto'>
        "We are passionate about revolutionizing the way we learn. Our innovative platform <span><Highlight text={"combines technology"}/></span>,<span><HighlightText text={"expertise "} color1={"cyan-500"} color2={"blue-500"} position={'r'}/></span>and community to create an <span><HighlightText text={"unparalleled educational experience."} color1={"cyan-500"} color2={"blue-500"} position={'r'}/>"</span>
    </div>
  )
}

export default Quote