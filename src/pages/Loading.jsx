import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

export const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <ClipLoader size={150} color={'#ef4444'}/>
    </div>
  )
}
