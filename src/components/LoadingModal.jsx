import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import ClipLoader from 'react-spinners/ClipLoader'

export const LoadingModal = () => {
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
      <div className="flex justify-center items-center rounded-lg w-52 aspect-square bg-white fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50 p-3 dark:bg-neutral-900">
        <ClipLoader size={150} color={'#ef4444'} />
      </div>
    </>, document.getElementById('modal')
  )
}
