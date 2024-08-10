import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';

const CourseCard = ({course,key, height}) => {

    const [avgRating, setAvgRating] = useState(0);

    useEffect(()=>{
        const count = GetAvgRating(course?.ratingAndReviews);
        setAvgRating(count);
    },[])

  return (
    <div className='mb-10'>
        <Link to={`/courses/${course._id}`}>
            <div>
                <div>
                    <img src={course?.thumbnail} alt='CourseThubnail' className={`${height} rounded-xl object-cover`}/>
                </div>
                <div className=' flex flex-col mt-2'>
                    <p>{course?.courseName}</p>
                    <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                    <div className=' flex gap-1'>
                        {avgRating!=0 && <span>{avgRating}</span>}
                        <span><RatingStars Review_Count={avgRating}/></span>
                        {course?.ratingAndReviews?.length != 0 && <span>{course?.ratingAndReviews?.length}</span>}
                    </div>
                    {course?.price != 0 && <p className=' text-richblack-5'>RS: {course?.price}</p>}
                </div>
            </div>
        </Link>
    </div>
  )
}

export default CourseCard