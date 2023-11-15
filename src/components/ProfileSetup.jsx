import React, { useState, useEffect, useRef, useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import ReactDOM from 'react-dom'
import { ProfilePicture } from './ProfilePicture'
import TextareaAutosize from 'react-textarea-autosize'
import { AiOutlinePicture } from 'react-icons/ai'
import { getUserDocRef, uploadProfilePicture, uploadCoverPicture, getURL, checkUsernameAvailability, addUsername, auth } from '../firebase'
import { CoverPicture } from './CoverPicture'
import { useModalFocus } from '../hooks/useModalFocus'
import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore'
import { useAuthUser } from '@react-query-firebase/auth'

export const ProfileSetup = ({ updateKey }) => {
  const user = useAuthUser('user', auth)

  const { userData } = useContext(UserContext)

  const userQueryMutation = useFirestoreDocumentMutation(getUserDocRef(user.data.uid))

  const [cover, setCover] = useState({
    preview: null,
    file: null
  })

  const [profile, setProfile] = useState({
    preview: null,
    file: null
  })

  const [errors, setErrors] = useState({
    username: '',
    bio: '',
    location: ''
  })

  const usernameRef = useRef()

  const bioRef = useRef()

  const locationRef = useRef()

  const [modalRef, firstFocusRef] = useModalFocus()

  const handleErrors = (input, message) => {
    if (input === 'username') {
      setErrors((prevState) => ({
        ...prevState,
        username: message
      }))
    }
    if (input === 'bio') {
      setErrors((prevState) => ({
        ...prevState,
        bio: message
      }))
    }
    if (input === 'location') {
      setErrors((prevState) => ({
        ...prevState,
        location: message
      }))
    }
  }

  const validateBio = () => {
    let error = ''
    if (bioRef.current.value.length > 150) error = 'Bio can\'t be longer than 150 characters'
    handleErrors('bio', error)
    if (error !== '') return false
    return true
  }

  const validateLocation = () => {
    let error = ''
    if (locationRef.current.value.length > 50) error = 'Location can\'t be longer than 50 characters'
    handleErrors('location', error)
    if (error !== '') return false
    return true
  }

  const validateUsername = async () => {
    let error = ''
    if (usernameRef.current.value.length > 20) error = 'Username must be between 4 and 20 characters'
    if (usernameRef.current.value.length < 4) error = 'Username must be between 4 and 20 characters'
    const usernameIsUnavailable = await checkUsernameAvailability(usernameRef.current.value)
    if (usernameIsUnavailable) error = 'That username is already taken'
    handleErrors('username', error)
    if (error !== '') return false
    return true
  }

  const validateAll = async () => {
    if (!validateBio()) return false
    if (!validateLocation()) return false
    if (await validateUsername() !== true) return false
    return true
  }

  const handleProfileChange = (evt) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState !== 2) return
      setProfile((prevState) => ({
        ...prevState,
        preview: reader.result,
        file: evt.target.files[0]
      }))
    }
    reader.readAsDataURL(evt.target.files[0])
  }

  const handleCoverChange = (evt) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState !== 2) return
      setCover((prevState) => ({
        ...prevState,
        preview: reader.result,
        file: evt.target.files[0]
      }))
    }
    reader.readAsDataURL(evt.target.files[0])
  }

  const handleSave = async () => {
    if (!validateAll()) return
    if (usernameRef.current.value === '') return
    let coverPicture = cover.preview
    let profilePicture = profile.preview
    const username = usernameRef.current.value
    const bio = bioRef.current.value
    const location = locationRef.current.value
    try {
      if (cover.file !== null) {
        const ref = await uploadCoverPicture(cover.file)
        coverPicture = await getURL(ref)
      }
      if (profile.file !== null) {
        const ref = await uploadProfilePicture(profile.file)
        profilePicture = await getURL(ref)
      }
      userQueryMutation.mutate({
        ...userData,
        coverPicture,
        profilePicture,
        username,
        bio,
        location,
        setup: true

      })
      addUsername(username)
      updateKey()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const unsetOverflow = () => {
      document.body.style.overflow = 'unset'
    }

    return () => unsetOverflow()
  }, [])

  useEffect(() => {
    setCover({
      preview: userData.coverPicture || '',
      file: null
    })
    setProfile({
      preview: userData.profilePicture || '',
      file: null
    })
  }, [])

  return ReactDOM.createPortal(
    <>
      <div className="bg-neutral-900 bg-opacity-50 fixed inset-0 z-40 dark:bg-gray-400 dark:bg-opacity-20"/>
      <div ref={modalRef} className="h-[650px] flex flex-col bg-neutral-100 fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50 p-3 w-[480px] rounded-lg overflow-auto pb-10 dark:bg-neutral-900 dark:text-neutral-100">
        <div className="flex gap-12 text-2xl mb-3">
          <div className="flex justify-between items-center w-full top-0">
            <h1 className="font-bold text-lg">Setup your profile</h1>
            <button onClick={handleSave} className="text-lg">Save</button>
          </div>
        </div>
        <div className="profile-cover-img relative">
          <CoverPicture url={cover.preview} />
          <label ref={firstFocusRef} tabIndex="0" htmlFor="cover-picture" className="upload-image-label"><AiOutlinePicture /></label>
          <input type="file" name="cover-picture" id="cover-picture" accept="image/*"className="hidden" onChange={(e) => handleCoverChange(e)}/>
        </div>
        <div className="profile-top-wrapper">
          <div className="profile-top-left-wrapper relative">
            <div className="profile-top-left">
              <label tabIndex="0" htmlFor="profile-picture" className="upload-image-label"><AiOutlinePicture /></label>
              <input type="file" name="profile-picture" id="profile-picture" accept="image/*"className="hidden" onChange={(e) => handleProfileChange(e)}/>
              <ProfilePicture url={profile.preview} size="large" />
            </div>
          </div>
        </div>
        <form className="flex flex-col mt-8" noValidate action="">
          <div className="relative border-2 border-slate-400 focus-within:border-blue-500">
            <input ref={usernameRef} onBlur={validateUsername} required type="text" className="w-full px-3 pt-5 min-h-[64px] text-lg outline-none bg-none peer dark:bg-neutral-900" />
            <label className="ml-2 text-slate-400 absolute top-1/2 left-1 -translate-y-1/2 text-lg pointer-events-none duration-300 peer-valid:top-4 peer-valid:text-sm peer-focus:top-4 peer-focus:text-sm">Username</label>
          </div>
          <div className="text-red-400 p-2 h-10 opacity-100 transition-opacity">
            <span>{errors.username}</span>
          </div>
          <div className="relative border-2 border-slate-400 focus-within:border-blue-500">
            <TextareaAutosize ref={bioRef} onChange={validateBio} required className="w-full px-3 pt-7 min-h-[64px] text-lg outline-none bg-none peer resize-none dark:bg-neutral-900" />
            <label className="ml-2 text-slate-400 absolute top-1/2 left-1 -translate-y-1/2 text-lg pointer-events-none duration-300 peer-valid:top-4 peer-valid:text-sm peer-focus:top-4 peer-focus:text-sm">Bio</label>
          </div>
          <div className="text-red-400 p-2 h-10 opacity-100 transition-opacity">
            <span>{errors.bio}</span>
          </div>
          <div className="relative border-2 border-slate-400 focus-within:border-blue-500">
            <input ref={locationRef} onChange={validateLocation} required type="text" className="w-full px-3 pt-5 min-h-[64px] text-lg outline-none bg-none peer dark:bg-neutral-900" />
            <label className="ml-2 text-slate-400 absolute top-1/2 left-1 -translate-y-1/2 text-lg pointer-events-none duration-300 peer-valid:top-4 peer-valid:text-sm peer-focus:top-4 peer-focus:text-sm">Location</label>
          </div>
          <div className="text-red-400 p-2 h-10 opacity-100 transition-opacity">
            <span>{errors.location}</span>
          </div>
        </form>
      </div>
    </>, document.getElementById('modal')
  )
}
