import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';

const RenderTotalItems = () => {
    const {total} = useSelector((store)=>store.cart);
    const {cart} = useSelector((store)=>store.cart)

    const handleBuyCourse = ()=>{
        const courses = cart.map((course)=>course._id);
        console.log(courses);
        // todo : api integration ->payment gaetway
    }
  return (
    <div className=' flex flex-col'>
        <p>Total : </p>
        <p>{total}</p>
        <IconBtn text={"Buy Now"}
        onclick={handleBuyCourse}/>
    </div>
  )
}

export default RenderTotalItems