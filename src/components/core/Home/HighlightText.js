import React from 'react'

const HighlightText = ({text,color1,color2,position}) => {
  return (
    <span className={`rounded-full font-bold bg-gradient-to-${position} from-${color1} to-${color2} text-transparent bg-clip-text`}>
        {text}
    </span>
  )
}

export default HighlightText