import React, { useState, useContext } from 'react'
import ReactDOM from 'react-dom'
import { MdOutlineClose } from 'react-icons/md'
import ProfilePicture from './ProfilePicture'
import { UserContext } from '../data/UserContext'
import TextareaAutosize from 'react-textarea-autosize'
import { AiOutlinePicture } from 'react-icons/ai'

export default function UpdateProfile ({ closeModal }) {
  const { user } = useContext(UserContext)

  const [profile, setProfile] = useState('')

  const [cover, setCover] = useState('')

  function handleSave () {
    closeModal()
  }

  function handleImageUpload (evt, setCallback) {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState !== 2) return
      setCallback(reader.result)
    }
    reader.readAsDataURL(evt.target.files[0])
  }

  function handleProfileChange (evt) {
    handleImageUpload(evt, setProfile)
  }

  function handleCoverChange (evt) {
    handleImageUpload(evt, setCover)
  }

  return ReactDOM.createPortal(
    <>
      <div className="bg-black bg-opacity-50 fixed inset-0 z-40"/>
      <div className="max-h-[1000px] flex flex-col bg-white fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50 p-3 w-[480px] h-auto rounded-lg overflow-auto pb-10">
        <div className="flex gap-12 text-2xl mb-3">
          <button onClick={closeModal}><MdOutlineClose /></button>
          <div className="flex justify-between items-center w-full">
            <h1 className="font-bold text-lg">Edit profile</h1>
            <button onClick={handleSave} className="text-lg">Save</button>
          </div>
        </div>
        <div className="profile-cover-img relative">
          <img src={cover !== '' ? cover : user.coverPicture} className="h-full w-full" />
          <label htmlFor="cover-picture" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute border-2 bg-red-500 rounded-full p-3 text-white font-bold hover:cursor-pointer opacity-50 hover:opacity-100"><AiOutlinePicture /></label>
          <input type="file" name="cover-picture" id="cover-picture" accepts="image/*"className="hidden" onChange={(e) => handleCoverChange(e)}/>
        </div>
        <div className="profile-top-wrapper">
          <div className="profile-top-left-wrapper relative">
            <div className="profile-top-left">
            <label htmlFor="profile-picture" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute border-2 bg-red-500 rounded-full p-3 text-white font-bold hover:cursor-pointer opacity-50 hover:opacity-100"><AiOutlinePicture /></label>
              <input type="file" name="profile-picture" id="profile-picture" accepts="image/*"className="hidden" onChange={(e) => handleProfileChange(e)}/>
              <ProfilePicture url={profile !== '' ? profile : user.profilePicture} size="large" />
            </div>
          </div>
        </div>
        <div className="relative border-2 border-slate-400 mt-8 focus-within:border-blue-500">
          <TextareaAutosize required className="w-full px-3 pt-7 min-h-[64px] text-lg outline-none bg-none peer resize-none" />
          <label htmlFor="" className="ml-2 text-slate-400 absolute top-1/2 left-1 -translate-y-1/2 text-lg pointer-events-none duration-300 peer-valid:top-4 peer-valid:text-sm peer-focus:top-4 peer-focus:text-sm">Bio</label>
        </div>
        <div className="relative border-2 border-slate-400 mt-8 focus-within:border-blue-500">
          <input required type="text" className="w-full px-3 pt-5 min-h-[64px] text-lg outline-none bg-none peer" />
          <label htmlFor="" className="ml-2 text-slate-400 absolute top-1/2 left-1 -translate-y-1/2 text-lg pointer-events-none duration-300 peer-valid:top-4 peer-valid:text-sm peer-focus:top-4 peer-focus:text-sm">Location</label>
        </div>
      </div>
    </>, document.getElementById('modal')
  )
}
