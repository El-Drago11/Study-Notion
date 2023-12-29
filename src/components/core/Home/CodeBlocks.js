import React from 'react'
import CTAbuuton from './CTAbuuton'
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({position,heading ,subheading,ctabtn1,ctabtn2,codeBlock,backgroungGradient,codeColor }) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-40`}>
        {/*  */}
        <div className='w-[50%] flex flex-col my-auto'>
            <div className='text-4xl'>{heading}</div>
            <div className='text-richblack-300 font-bold my-4 w-[70%]'>
                {subheading}
            </div>
            <div className='flex flex-row gap-14'>
                <CTAbuuton text={ctabtn1.text} active={ctabtn1.active} linkto={ctabtn1.linkto}/>
                <CTAbuuton text={ctabtn2.text} active={ctabtn2.active} linkto={ctabtn2.linkto}/>
            </div>
        </div>
        <div className={`flex flex-row w-[50%] text-lg border-solid border-2 p-5 rounded-xl bg-richblack-800`}>
            {/*TODO : bg-gradients */}
            <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
            </div>
            <div className={`text-left flex flex-col w-[90%] gap-2 ${codeColor} font-inter font-bold}`}>
                <TypeAnimation
                    sequence={[codeBlock,100,""]}
                    repeat={Infinity}
                    cursor={true}
                    omitDeletionAnimation={false}
                    style={
                        {
                            whiteSpace:'pre-line',
                            display:'block'
                        }
                    }
                />
            </div>
        </div>
        
    </div>
  )
}

export default CodeBlocks