import React from 'react'
import IconBtn from './IconBtn'
import index from '../../index.css'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className=' text-richblack-700'>
        <div className='modal-wrapper'></div>
        <div className='modal-container text-2xl'>
            <p className='font-extrabold text-4xl'>{modalData?.text1}</p>
            <p className='mt-4'>{modalData?.text2}</p>
            <div className=' flex flex-row gap-5 mt-5'>
                <IconBtn onclick={modalData?.btn1Handler} text={modalData?.btn1Text}/>
                <button onClick={modalData?.btn2Handler}>{modalData?.btn2Text}</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal