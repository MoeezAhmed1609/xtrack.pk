import React from 'react'
import { AiOutlineWhatsApp } from 'react-icons/ai'

const Whatsapp = () => {
  return (
    <div className="position-fixed d-flex justify-content-center align-items-center text-center p-2 rounded-circle whatsapp bg-success">
      <a
        href="https://wa.me/923272026242"
        target="_blank"
        className="fs-1 text-white"
      >
        <AiOutlineWhatsApp className='pb-1' />
      </a>
    </div>
  )
}

export default Whatsapp
