import React from 'react'
import ReactDOM from 'react-dom'

export default function CreateAlbum () {
  return ReactDOM.createPortal(
    <>
      <div className="bg-black bg-opacity-50 fixed inset-0 z-40"/>
      <div className="bg-white fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50 p-3 w-1/3 h-1/2 rounded-lg">
        <form className="flex flex-col gap-3">
          <h1 className="font-bold text-lg">Make your album</h1>
          <label htmlFor="">Album title</label>
          <input type="text" />
          <label htmlFor="">Cover image</label>
          <input type="text" />
          <button>Create Album</button>
        </form>
      </div>
    </>, document.getElementById('modal')
  )
}
