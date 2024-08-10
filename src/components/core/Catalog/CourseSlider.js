import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import CourseCard from './CourseCard'

const CourseSlider = ({Courses}) => {
  return (
    <>
    {
        Courses?.length ? 
        (<>
        <Swiper
            slidesPerView={1}
          spaceBetween={1}
          loop={true}
          breakpoints={{
            1024: {
              slidesPerView: 1,
            },
          }}
        >
            {
                Courses?.map((course,index)=>(
                    <SwiperSlide>
                        <CourseCard course={course} key={index} height={'h-[250px]'}/>
                    </SwiperSlide>
                ))
            }
        </Swiper>
        </>) : 
        ( <p>No Courses Found !</p>)
    }
    </>
  )
}

export default CourseSlider