import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import { MdOutlineClose } from 'react-icons/md'
import PropTypes from 'prop-types'

export default function CreateAlbum ({ closeModal }) {
  const [coverImage, setCoverImage] = useState('')

  const [title, setTitle] = useState('')

  const inputRef = useRef(null)

  function updateTitle () {
    setTitle(inputRef.current.value)
  }

  function handleImageUpload (evt) {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState !== 2) return
      setCoverImage(reader.result)
    }
    reader.readAsDataURL(evt.target.files[0])
  }

  function newAlbum () {
    if (inputRef.current.value === '') return
    console.log(title)
    closeModal()
  }

  return ReactDOM.createPortal(
    <>
      <div className="bg-black bg-opacity-50 fixed inset-0 z-40"/>
      <div className="flex flex-col bg-white fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50 p-3 w-[480px] h-auto rounded-lg overflow-auto">
        <div className="flex gap-12 text-2xl mb-3">
          <button onClick={closeModal}><MdOutlineClose /></button>
          <h1 className="font-bold text-lg">Make your album</h1>
        </div>
        <div className="mx-10 p-3 h-full">
          <div className="relative border-b-2 border-black border-solid my-8">
            <input ref={inputRef} onChange={updateTitle} required type="text" className="w-full px-1 h-10 text-lg outline-none bg-none peer" />
            <label htmlFor="" className="text-slate-400 absolute top-1/2 left-1 -translate-y-1/2 text-lg pointer-events-none duration-300 peer-valid:-top-1 peer-valid:text-sm peer-focus:-top-1 peer-focus:text-sm">Album title</label>
          </div>
          <div className="flex items-center justify-center w-full h-fit p-3 rounded-lg">
            {coverImage === ''
              ? <div className="">
                  <label htmlFor="cover" className="cursor-pointer hover:text-red-500">Upload a cover image</label>
                  <input name="cover" id="cover" className="hidden" type="file" accept="image/*" onChange={(e) => handleImageUpload(e)} />
                </div>
              : <div className="relative w-full">
                  <img src={coverImage} className="rounded-lg" />
                  <button className="absolute top-3 left-3 rounded-full hover:cursor-pointer text-white bg-black" onClick={() => setCoverImage('')}>
                    <MdOutlineClose />
                  </button>
                </div>}
          </div>
          <div className="flex bg-white justify-center w-full bottom-0 mt-3">
            <button onClick={newAlbum} className={title === '' ? 'inactive-button w-40' : 'follow-button w-48'}>Create Album</button>
          </div>
        </div>

      </div>
    </>, document.getElementById('modal')
  )
}

CreateAlbum.propTypes = {
  closeModal: PropTypes.func
}
