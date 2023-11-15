import React, { useState, useEffect, useRef, useContext } from 'react'
import ReactDOM from 'react-dom'
import { ProfilePicture } from './ProfilePicture'
import TextareaAutosize from 'react-textarea-autosize'
import { AiOutlinePicture } from 'react-icons/ai'
import { UserContext } from '../contexts/UserContext'
import { auth, uploadProfilePicture, uploadCoverPicture, getURL, getUserDocRef } from '../firebase'
import { MdOutlineClose } from 'react-icons/md'
import { CoverPicture } from './CoverPicture'
import { useModalFocus } from '../hooks/useModalFocus'
import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore'
import { useAuthUser } from '@react-query-firebase/auth'

export const UpdateProfile = ({ closeModal, updateKey }) => {
  const user = useAuthUser('user', auth)

  const { userData } = useContext(UserContext)

  const userQueryMutation = useFirestoreDocumentMutation(getUserDocRef(user.data.uid))

  const [cover, setCover] = useState({
    preview: '',
    file: null
  })

  const [profile, setProfile] = useState({
    preview: '',
    file: null
  })

  const [errors, setErrors] = useState({
    username: '',
    bio: '',
    location: ''
  })

  const [bio, setBio] = useState('')

  const [location, setLocation] = useState('')

  const bioRef = useRef()

  const locationRef = useRef()

  const [modalRef, firstFocusRef] = useModalFocus()

  const handleErrors = (input, message) => {
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

  const validateAll = () => {
    let validated = true
    if (!validateBio()) validated = false
    if (!validateLocation()) validated = false
    return validated
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

  const updateBio = () => {
    validateBio()
    setBio(bioRef.current.value)
  }

  const updateLocation = () => {
    validateLocation()
    setLocation(locationRef.current.value)
  }

  const handleSave = async () => {
    if (!validateAll()) return
    let coverPicture = cover.preview
    let profilePicture = profile.preview
    const bio = bioRef.current.value
    const location = locationRef.current.value
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
      bio,
      location

    })
    updateKey()
    closeModal()
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
      preview: user.coverPicture || '',
      file: null
    })
    setProfile({
      preview: user.profilePicture || '',
      file: null
    })
    setBio(userData.bio)
    setLocation(userData.location)
  }, [])

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
    const detectOutsideClick = (evt) => {
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
      <div className="bg-black bg-opacity-50 fixed inset-0 z-40 dark:bg-gray-400 dark:bg-opacity-20"/>
      <div ref={modalRef} className="h-[650px] flex flex-col bg-neutral-100 dark:bg-neutral-900 fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50 p-3 w-[480px] rounded-lg overflow-auto pb-10 dark:">
        <div className="flex gap-12 text-2xl mb-3">
          <div className="flex justify-between items-center w-full">
            <button onClick={closeModal} className="dark:text-neutral-100"><MdOutlineClose /></button>
            <h1 className="font-bold text-lg dark:text-neutral-100">Update your profile</h1>
            <button onClick={handleSave} className="text-lg dark:text-neutral-100">Save</button>
          </div>
        </div>
        <div className="w-full h-80 bg-slate-500 relative">
          <CoverPicture url={cover.preview} />
          <label ref={firstFocusRef} tabIndex="0" htmlFor="cover-picture" className="upload-image-label"><AiOutlinePicture /></label>
          <input type="file" name="cover-picture" id="cover-picture" accept="image/*"className="hidden" onChange={(e) => handleCoverChange(e)}/>
        </div>
        <div className="flex h-16 justify-end items-start relative w-36">
          <div className="absolute left-3 bottom-0">
            <label tabIndex="0" htmlFor="profile-picture" className="upload-image-label"><AiOutlinePicture /></label>
            <input type="file" name="profile-picture" id="profile-picture" accept="image/*"className="hidden" onChange={(e) => handleProfileChange(e)}/>
            <ProfilePicture url={profile.preview} size="large" />
          </div>
        </div>
        <form className="flex flex-col" noValidate action="">
          <div className="relative border-2 border-slate-400 mt-8 focus-within:border-blue-500">
            <TextareaAutosize ref={bioRef} onChange={updateBio} required className="w-full px-3 pt-7 min-h-[64px] text-lg outline-none bg-none peer resize-none dark:bg-neutral-900 dark:text-neutral-100" value={bio}/>
            <label className="ml-2 text-slate-400 absolute top-1/2 left-1 -translate-y-1/2 text-lg pointer-events-none duration-300 peer-valid:top-4 peer-valid:text-sm peer-focus:top-4 peer-focus:text-sm">Bio</label>
          </div>
          <div className="text-red-400 p-2 opacity-100 transition-opacity">
            <span>{errors.bio}</span>
          </div>
          <div className="relative border-2 border-slate-400 mt-8 focus-within:border-blue-500">
            <input ref={locationRef} onChange={updateLocation} required type="text" className="w-full px-3 pt-5 min-h-[64px] text-lg outline-none bg-none peer dark:bg-neutral-900 dark:text-neutral-100" value={location} />
            <label className="ml-2 text-slate-400 absolute top-1/2 left-1 -translate-y-1/2 text-lg pointer-events-none duration-300 peer-valid:top-4 peer-valid:text-sm peer-focus:top-4 peer-focus:text-sm">Location</label>
          </div>
          <div className="text-red-400 p-2 opacity-100 transition-opacity">
            <span>{errors.location}</span>
          </div>
        </form>
      </div>
    </>, document.getElementById('modal')
  )
}
