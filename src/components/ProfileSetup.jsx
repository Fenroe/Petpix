import React, { useState, useEffect, useRef, useContext } from 'react'
import ReactDOM from 'react-dom'
import { ProfilePicture } from './ProfilePicture'
import TextareaAutosize from 'react-textarea-autosize'
import { AiOutlinePicture } from 'react-icons/ai'
import { UserContext } from '../contexts/UserContext'
import { db, uploadProfilePicture, uploadCoverPicture, getURL, checkUsernameAvailability, addUsername } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'
import { CoverPicture } from './CoverPicture'

export const ProfileSetup = () => {
  const { user, setUser, loading, setLoading } = useContext(UserContext)

  const [cover, setCover] = useState({
    reference: null,
    preview: null,
    file: null
  })

  const [profile, setProfile] = useState({
    reference: null,
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
    if (usernameRef.current.value.length > 20) error = 'Username must be between 4 and 20 characters long and can\'t be left blank'
    if (usernameRef.current.value.length < 4) error = 'Username must be between 4 and 20 characters long and can\'t be left blank'
    if (error === '') {
      const usernameIsUnavailable = await checkUsernameAvailability(usernameRef.current.value)
      if (usernameIsUnavailable) error = 'That username is already taken'
    }
    handleErrors('username', error)
    if (error !== '') return false
    return true
  }

  const validateAll = () => {
    let validated = true
    if (!validateBio()) validated = false
    if (!validateLocation()) validated = false
    if (!validateUsername()) validated = false
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

  const handleSave = async () => {
    if (loading) return
    if (!validateAll()) return
    const username = usernameRef.current.value
    const bio = bioRef.current.value
    const location = locationRef.current.value
    setUser((prevState) => ({
      ...prevState,
      username,
      profilePicture: profile.preview,
      coverPicture: cover.preview,
      bio,
      location,
      setup: true
    }))
    setLoading(true)
    const userRef = doc(db, 'users', user.userId)
    if (cover.preview !== cover.reference) {
      const ref = await uploadCoverPicture(cover.file)
      const coverURL = await getURL(ref)
      await setDoc(userRef, {
        coverPicture: coverURL
      }, {
        merge: true
      })
    }
    if (profile.preview !== profile.reference) {
      const ref = await uploadProfilePicture(profile.file)
      const profileURL = await getURL(ref)
      await setDoc(userRef, {
        profilePicture: profileURL
      }, {
        merge: true
      })
    }
    await setDoc(userRef, {
      username,
      bio,
      location,
      setup: true
    }, {
      merge: true
    })
    await addUsername(username)
    setLoading(false)
  }

  useEffect(() => {
    setCover({
      reference: user.coverPicture,
      preview: user.coverPicture,
      file: null
    })
    setProfile({
      reference: user.profilePicture,
      preview: user.profilePicture,
      file: null
    })
  }, [])

  return ReactDOM.createPortal(
    <>
      <div className="bg-black bg-opacity-50 fixed inset-0 z-40"/>
      <div className="h-[800px] flex flex-col bg-white fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50 p-3 w-[480px] rounded-lg overflow-auto pb-10">
        <div className="flex gap-12 text-2xl mb-3">
          <div className="flex justify-between items-center w-full">
            <h1 className="font-bold text-lg">Setup your profile</h1>
            <button onClick={handleSave} className="text-lg">Save</button>
          </div>
        </div>
        <div className="profile-cover-img relative">
          <CoverPicture url={cover.preview} />
          <label htmlFor="cover-picture" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute border-2 bg-red-500 rounded-full p-3 text-white font-bold hover:cursor-pointer opacity-50 hover:opacity-100"><AiOutlinePicture /></label>
          <input type="file" name="cover-picture" id="cover-picture" accepts="image/*"className="hidden" onChange={(e) => handleCoverChange(e)}/>
        </div>
        <div className="profile-top-wrapper">
          <div className="profile-top-left-wrapper relative">
            <div className="profile-top-left">
              <label htmlFor="profile-picture" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute border-2 bg-red-500 rounded-full p-3 text-white font-bold hover:cursor-pointer opacity-50 hover:opacity-100"><AiOutlinePicture /></label>
              <input type="file" name="profile-picture" id="profile-picture" accepts="image/*"className="hidden" onChange={(e) => handleProfileChange(e)}/>
              <ProfilePicture url={profile.preview} size="large" />
            </div>
          </div>
        </div>
        <form className="flex flex-col" noValidate action="">
          <div className="relative border-2 border-slate-400 mt-8 focus-within:border-blue-500">
            <input ref={usernameRef} onBlur={validateUsername} required type="text" className="w-full px-3 pt-5 min-h-[64px] text-lg outline-none bg-none peer" />
            <label className="ml-2 text-slate-400 absolute top-1/2 left-1 -translate-y-1/2 text-lg pointer-events-none duration-300 peer-valid:top-4 peer-valid:text-sm peer-focus:top-4 peer-focus:text-sm">Username</label>
          </div>
          <div className="text-red-400 p-2 opacity-100 transition-opacity">
            <span>{errors.username}</span>
          </div>
          <div className="relative border-2 border-slate-400 mt-8 focus-within:border-blue-500">
            <TextareaAutosize ref={bioRef} onChange={validateBio} required className="w-full px-3 pt-7 min-h-[64px] text-lg outline-none bg-none peer resize-none" />
            <label className="ml-2 text-slate-400 absolute top-1/2 left-1 -translate-y-1/2 text-lg pointer-events-none duration-300 peer-valid:top-4 peer-valid:text-sm peer-focus:top-4 peer-focus:text-sm">Bio</label>
          </div>
          <div className="text-red-400 p-2 opacity-100 transition-opacity">
            <span>{errors.bio}</span>
          </div>
          <div className="relative border-2 border-slate-400 mt-8 focus-within:border-blue-500">
            <input ref={locationRef} onChange={validateLocation} required type="text" className="w-full px-3 pt-5 min-h-[64px] text-lg outline-none bg-none peer" />
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
