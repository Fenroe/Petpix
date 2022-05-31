import React, { useState, useContext, useRef } from 'react'
import { AiOutlinePicture } from 'react-icons/ai'
import { MdOutlineClose } from 'react-icons/md'
import TextareaAutosize from 'react-textarea-autosize'
import ProfilePicture from './ProfilePicture'
import { UserContext } from '../data/UserContext'
import { uploadSnapPicture, getURL, postSnap } from '../firebase'

export default function CreateSnap () {
  const [uploadedImage, setUploadedImage] = useState('')

  const textareaRef = useRef(null)

  const { user } = useContext(UserContext)

  function handleImageUpload (evt) {
    uploadSnapPicture(evt.target.files[0])
      .then((result) => getURL(result))
      .then((result) => setUploadedImage(result))
  }

  async function handleSubmit (evt) {
    evt.preventDefault()
    await postSnap(user.username, user.profilePicture, uploadedImage, textareaRef.current.value)
    setUploadedImage('')
  }

  return (
    <div className="story-box">
      <div className="sb-profile-picture-wrapper">
        <a href="" className="">
          <ProfilePicture url={user.profilePicture} size="small" />
        </a>
      </div>
      <div className="w-full">
        {uploadedImage === ''
          ? (
          <div className="w-full h-28 flex items-center justify-center">
            <label htmlFor="post-image-input" className="border-2 bg-red-500 rounded-full p-3 text-white font-bold hover:cursor-pointer"><AiOutlinePicture className="text-2xl"/></label>
            <input className="hidden" type="file" name="image-upload" id="post-image-input" accept="image/*" onChange={(e) => handleImageUpload(e)}/>
          </div>
            )
          : (
            <div className="sb-content-wrapper>">
              <TextareaAutosize ref={textareaRef} className="sb-text-area" placeholder="Text goes here" />
              <div className="relative text-3xl rounded">
                <button className="absolute top-3 left-3 rounded-full hover:cursor-pointer text-white bg-black" onClick={() => setUploadedImage('')}>
                  <MdOutlineClose />
                </button>
                <img src={uploadedImage} className="rounded-xl" />
              </div>
            </div>
            )}
            <div className="w-full flex justify-end">
              <button className="min-h-[36px] border-2 bg-red-500 rounded-full px-4 text-white text-lg font-bold" onClick={(e) => handleSubmit(e)}>
                Snap
              </button>
            </div>
      </div>
    </div>
  )
}
