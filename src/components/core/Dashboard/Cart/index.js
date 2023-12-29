import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourse from './RenderCartCourse'
import RenderTotalItems from './RenderTotalItems'

const Cart = () => {
  const {total,totalItems} = useSelector((store)=>store.cart)
  return (
    <div className=' text-richblack-5 w-11/12 max-w-maxContent p-3 mt-4'>
        <h1 className=' text-3xl mb-4'>Your Cart</h1>
        <p>{totalItems} Courses in the cart</p>
        {total > 0 ?
        (<div className=' w-11/12 max-w-maxContent'>
          <RenderCartCourse/>
          <RenderTotalItems/>
        </div>)
        :
        (<p className=' text-center text-4xl'>Your Cart is Empty</p>)
        }
    </div>
  )
}

export default Cart