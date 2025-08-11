import { X } from 'lucide-react'
import React from 'react'

const Modal = ({open, onClose, children, header}) => {
  return (
    <>
    {open && <div className="fixed z-999 backdrop-blur-sm inset-0 bg-black/70 flex items-center justify-center">
    <div className='bg-white p-5 max-h-[80vh] flex flex-col relative rounded min-w-80 min-h-80'>
            <h1 className="text-2xl mb-2">{header}</h1>

        <X 
        onClick={onClose}
        className=' cursor-pointer absolute top-4 right-4'/>
        {children}
    </div>
    </div>}
    </>
  )
}

export default Modal