import React from 'react'

const Highlight = ({text}) => {
  return (
    <span className='rounded-full font-bold bg-gradient-to-r from-richblue-200 to-blue-100 px-2 '>
        {text}
    </span>
  )
}

export default Highlight