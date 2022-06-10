import React from 'react'
import ReactDOM from 'react-dom'
import { MdOutlineClose } from 'react-icons/md'

export const WriteErrorModal = ({ close }) => {
  return ReactDOM.createPortal(
    <>
      <div className="bg-black bg-opacity-50 fixed inset-0 z-40"/>
      <div className="rounded-lg w-96 h-36 bg-white fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50 p-3">
        <div className="w-full h-3 flex justify-end">
          <button className="text-xl cursor-pointer"onClick={close}>
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
