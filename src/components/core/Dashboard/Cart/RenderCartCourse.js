import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { MdOutlineStarBorder } from "react-icons/md";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { removeItemsfromcart } from '../../../../Store/cartReducer';

const RenderCartCourse = () => {
    const {cart} = useSelector((store)=>store.cart);
    const dispatch = useDispatch();
  return (
    <div>
        {cart.map((course,index)=>(
            <div className=' grid grid-cols-8' id={index}>
                <div className=' col-span-2'>
                    <img src={course?.thumbnail} alt='courseThumbnail'/>
                </div>
                <div className='col-span-4'>
                    <div className=' flex flex-col'>
                        <p>{course?.courseName}</p>
                        <p>{course?.category?.name}</p>
                        <div>
                            <ReactStars count={5} activeColor="#ffd700" size={20} edit={false} emptyIcon={<MdOutlineStarBorder/>} fullIcon={<MdOutlineStarBorder />}/>
                            <span>{course?.ratingAndReviews?.length}Ratings</span>
                        </div>
                    </div>
                </div>
                <div className='col-span-2'>
                    <button onClick={()=>{dispatch(removeItemsfromcart(course._id))}}><RiDeleteBin6Line/>Remove</button>
                    <p>RS.{course?.price}</p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default RenderCartCourse