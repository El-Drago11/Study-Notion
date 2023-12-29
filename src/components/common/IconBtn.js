import React from 'react'

const IconBtn = ({text,onclick,children,disabled,outline=false,customClasses,type}) => {
  return (
    <button disabled={disabled} onClick={onclick} type={type} className=' bg-yellow-100 text-richblack-900 rounded-md px-2 py-2 flex flex-row gap-2 items-center'>
        {
            children ? 
            (
                <>
                    <span>{text}</span>
                    {children}
                </>
            ) : 
            (text)
        }
    </button>
  )
}

export default IconBtn