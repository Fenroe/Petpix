import React, { useState, useContext } from 'react'
import { AiOutlinePicture } from 'react-icons/ai'
import { MdOutlineClose } from 'react-icons/md'
import exampleProfilePicture from '../assets/profilePictures/the-rock.jpg'
import TextareaAutosize from 'react-textarea-autosize'
import ProfilePicture from './ProfilePicture'
import { UserContext } from '../data/UserContext'

export default function Snap () {
  const [uploadedImage, setUploadedImage] = useState('')

  const { user, setUser } = useContext(UserContext)

  function handleImageUpload (evt) {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState !== 2) return
      setUploadedImage(reader.result)
    }
    reader.readAsDataURL(evt.target.files[0])
  }

  function handleSubmit (evt) {
    evt.preventDefault()
    const newSnap = {
      userProfilePicture: user.profilePicture,
      username: user.username,
      timestamp: new Date(),
      image: uploadedImage,
      text: '',
      likes: 0
    }
    const userSnaps = user.snaps
    userSnaps.push(newSnap)
    setUser((prevState) => ({
      ...prevState,
      snaps: userSnaps
    }))
    setUploadedImage('')
  }

  return (
    <div className="story-box">
      <div className="sb-profile-picture-wrapper">
        <a href="" className="">
          <ProfilePicture url={exampleProfilePicture} size="small" />
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
              <TextareaAutosize className="sb-text-area" placeholder="Text goes here" />
              <div className="relative text-3xl rounded">
                <button className="absolute top-3 left-3 rounded-full hover:cursor-pointer text-white bg-black" onClick={() => setUploadedImage('')}>
                  <MdOutlineClose />
                </button>
                <img src={uploadedImage} className="rounded-xl" />
              </div>
            </div>
            )}
            <div className="w-full flex justify-end">
              <button className="w-24 border-2 bg-red-500 rounded-full p-1 text-white font-bold" onClick={(e) => handleSubmit(e)}>Send</button>
            </div>
      </div>
    </div>
  )
}
