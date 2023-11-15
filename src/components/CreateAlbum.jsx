import React, { useState, useEffect, useRef, useContext } from 'react'
import ReactDOM from 'react-dom'
import { MdOutlineClose } from 'react-icons/md'
import PropTypes from 'prop-types'
import { addAlbum, createAlbum, getURL, uploadAlbumCover } from '../firebase'
import { UserContext } from '../contexts/UserContext'

export const CreateAlbum = ({ closeModal }) => {
  const [coverImage, setCoverImage] = useState({
    preview: '',
    file: null
  })

  const [title, setTitle] = useState('')

  const inputRef = useRef(null)

  const modalRef = useRef(null)

  const { userData } = useContext(UserContext)

  const updateTitle = () => {
    setTitle(inputRef.current.value)
  }

  const handleImageUpload = (evt) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState !== 2) return
      setCoverImage({
        preview: reader.result,
        file: evt.target.files[0]
      })
    }
    reader.readAsDataURL(evt.target.files[0])
  }

  const handleSubmit = async () => {
    if (inputRef.current.value === '') return
    const docRef = await addAlbum()
    const title = inputRef.current.value
    const file = coverImage.file
    let albumCover = ''
    try {
      if (coverImage.file !== null) {
        const imageRef = await uploadAlbumCover(file)
        albumCover = await getURL(imageRef)
      }
      await createAlbum(title, albumCover, userData.userId, userData.username, userData.profilePicture, docRef)
      closeModal()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const closeOnEscape = (evt) => {
      if (evt.key === 'Escape') {
        closeModal()
      }
    }
    document.addEventListener('keydown', (evt) => closeOnEscape(evt))

    return () => document.removeEventListener('keydown', (evt) => closeOnEscape(evt))
  }, [])

  useEffect(() => {
    function detectOutsideClick (evt) {
      if (!modalRef.current) return
      if (modalRef.current.contains(evt.target)) return
      closeModal()
    }

    document.addEventListener('mousedown', detectOutsideClick)

    return () => {
      document.removeEventListener('mousedown', detectOutsideClick)
    }
  }, [])

  return ReactDOM.createPortal(
    <>
      <div className="bg-neutral-900 bg-opacity-50 fixed inset-0 z-40 dark:bg-gray-400 dark:bg-opacity-20"/>
      <div ref={modalRef} className="flex flex-col bg-neutral-100 fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50 p-3 w-[480px] h-auto rounded-lg overflow-auto dark:bg-neutral-900 dark:text-neutral-100">
        <div className="flex gap-12 text-2xl mb-3">
          <button onClick={closeModal}><MdOutlineClose /></button>
          <h1 className="font-bold text-lg">Make your album</h1>
        </div>
        <div className="mx-10 p-3 h-full">
          <div className="relative border-2 border-slate-400 mt-8 focus-within:border-blue-500">
            <input ref={inputRef} required type="text" className="w-full px-3 pt-5 min-h-[64px] text-lg outline-none bg-none peer dark:bg-neutral-900 dark:text-neutral-50" onChange={updateTitle} />
            <label htmlFor="" className="ml-2 text-slate-400 absolute top-1/2 left-1 -translate-y-1/2 text-lg pointer-events-none duration-300 peer-valid:top-4 peer-valid:text-sm peer-focus:top-4 peer-focus:text-sm">Album title</label>
          </div>
          <div className="flex items-center justify-center w-full h-fit p-3 rounded-lg">
            {coverImage.file === null
              ? <div className="">
                  <label htmlFor="cover" className="cursor-pointer hover:text-red-500">Upload a cover image</label>
                  <input name="cover" id="cover" className="hidden" type="file" accept="image/*" onChange={(e) => handleImageUpload(e)} />
                </div>
              : <div className="relative w-full">
                  <img src={coverImage.preview} className="rounded-lg" />
                  <button className="absolute top-3 left-3 rounded-full hover:cursor-pointer text-neutral-100 bg-neutral-900" onClick={() => setCoverImage({ preview: '', file: null })}>
                    <MdOutlineClose />
                  </button>
                </div>}
          </div>
          <div className="flex bg-neutral-100 justify-center w-full bottom-0 mt-3 dark:bg-neutral-900">
            <button onClick={handleSubmit} className={title === '' ? 'inactive-button w-40' : 'follow-button w-48'}>Create Album</button>
          </div>
        </div>

      </div>
    </>, document.getElementById('modal')
  )
}

CreateAlbum.propTypes = {
  closeModal: PropTypes.func
}
