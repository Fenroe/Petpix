import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { MdOutlineClose } from 'react-icons/md'
import { useModalFocus } from '../hooks/useModalFocus'

export const WriteErrorModal = ({ close }) => {
  const [modalRef, firstFocusRef] = useModalFocus()

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const unsetOverflow = () => {
      document.body.style.overflow = 'unset'
    }

    return () => unsetOverflow()
  }, [])

  return ReactDOM.createPortal(
    <>
      <div className="bg-black bg-opacity-50 fixed inset-0 z-40"/>
      <div ref={modalRef} className="rounded-lg w-96 h-36 bg-neutral-100 fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50 p-3">
        <div className="w-full h-3 flex justify-end">
          <button ref={firstFocusRef} className="text-xl cursor-pointer transition-transform focus:scale-125 hover:scale-125"onClick={close}>
            <MdOutlineClose />
          </button>
        </div>
        <div className="flex justify-center items-center text-xl w-full h-full">
          <h1>Sorry, something went wrong</h1>
        </div>
      </div>
    </>, document.getElementById('modal')
  )
}
