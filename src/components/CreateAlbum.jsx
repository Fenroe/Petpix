import React from 'react'
import ReactDOM from 'react-dom'
import { MdOutlineClose } from 'react-icons/md'
import PropTypes from 'prop-types'

export default function CreateAlbum ({ closeModal }) {
  function newAlbum () {
    console.log('album created')
  }

  return ReactDOM.createPortal(
    <>
      <div className="bg-black bg-opacity-50 fixed inset-0 z-40"/>
      <div className="flex flex-col bg-white fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50 p-3 w-1/3 h-1/2 rounded-lg">
        <div className="flex gap-12 text-2xl mb-3">
          <button onClick={closeModal}><MdOutlineClose /></button>
          <h1 className="font-bold text-lg">Make your album</h1>
        </div>
        <form>
          <div className="">
            <input required type="text" className="w-full" />
            <label htmlFor="">Album title</label>
          </div>
          <div className="">
            <label htmlFor="">Cover image</label>
            <input type="file" />
          </div>
          <button onClick={newAlbum} className="follow-button w-48">Create Album</button>
        </form>
      </div>
    </>, document.getElementById('modal')
  )
}

CreateAlbum.propTypes = {
  closeModal: PropTypes.func
}
