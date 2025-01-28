import React from 'react'
import Highlight from '../Home/Highlight';
import CTAbuuton from '../Home/CTAbuuton';

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];

const LearningGrid = () => {
  return (
    <div className='flex flex-col w-full'>
        <div className='grid grid-cols-1 lg:grid-cols-4 mx-auto  mb-10 mt-10 w-11/12 max-w-maxContent'>
            {
                LearningGridArray.map((card,index)=>(
                    <div className={`
                        ${index === 0 && "lg:col-span-2 sm:h-fit"} 
                        ${card.order%2===1 ? " bg-richblack-800" : "bg-richblack-600"}
                        ${card.order === 3 && "lg:col-start-2"}
                        p-7]`} key={index}>
                        {card?.order < 0 ? 
                            <div className='flex flex-col p-4 mx-auto'>
                                <h1 className="text-4xl text-richblack-5">{card?.heading}</h1>
                                <h1 className='text-4xl text-richblack-5'><Highlight text={card?.highlightText}/></h1>
                                <p className=' text-richblack-300 mt-4'>
                                    {card?.description}
                                </p>
                                <div className='w-[50%] mt-4'>
                                    <CTAbuuton text={"Learn More"} active={true}/>
                                </div>
                            </div>
                            :
                            <div className='flex flex-col p-10'>
                                <h1 className='text-2xl text-richblack-5'>{card?.heading}</h1>
                                <p className=' text-richblack-300 mt-4 font-medium'>
                                    {card?.description}
                                </p>
                            </div>
                        }
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default LearningGrid