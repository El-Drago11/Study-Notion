import React from 'react'
import { Link } from 'react-router-dom'

const CTAbuuton = ({text,active ,linkto}) => {
  return (
        <Link to={linkto}>
            <div className={`text-center text-md px-3 md:px-6 py-2 md:py-3 rounded-md font-bold ${active ? "bg-yellow-50 text-black" : "bg-richblack-800" } hover:scale-95 transition-all duration-200`}> 
                {text}
            </div>
        </Link>
  )
}

export default CTAbuuton