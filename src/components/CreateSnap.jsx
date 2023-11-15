import React, { useState, useRef, useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { AiOutlinePicture } from 'react-icons/ai'
import { MdOutlineClose } from 'react-icons/md'
import TextareaAutosize from 'react-textarea-autosize'
import { ProfilePicture } from './ProfilePicture'
import { uploadSnapPicture, getURL, snapCollection } from '../firebase'
import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore'

export const CreateSnap = () => {
  const snapCollectionMutation = useFirestoreCollectionMutation(snapCollection)

  const { userData } = useContext(UserContext)

  const [uploadedImage, setUploadedImage] = useState({
    preview: '',
    file: null
  })

  const [error, setError] = useState('')

  const textareaRef = useRef(null)

  const handleImageUpload = (evt) => {
    setError('')
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState !== 2) return
      setUploadedImage({
        preview: reader.result,
        file: evt.target.files[0]
      })
    }
    reader.readAsDataURL(evt.target.files[0])
  }

  const handleErrors = (message) => setError(message)

  const validateText = () => {
    if (textareaRef.current.value.length > 150) return handleErrors('Your description has to be 150 characters or shorter')
    return handleErrors('')
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    if (uploadedImage.file === null) return handleErrors('Upload an image to share')
    if (textareaRef.current.value.length > 150) return
    try {
      const file = uploadedImage.file
      const snapText = textareaRef.current.value
      const imageRef = await uploadSnapPicture(file)
      const imageURL = await getURL(imageRef)
      snapCollectionMutation.mutate({
        userId: userData.userId,
        username: userData.username,
        profilePicture: userData.profilePicture,
        posted: new Date(),
        image: imageURL,
        text: snapText,
        likedBy: []
      })
      setUploadedImage({
        preview: '',
        file: null
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="story-box">
      <div className="sb-profile-picture-wrapper">
        <Link to={`/profile/${userData?.userId}`} className="">
          <ProfilePicture url={userData?.profilePicture} size="small" />
        </Link>
      </div>
      <div className="w-full">
        {uploadedImage.file === null
          ? (
          <div className="w-full h-28 flex items-center justify-center">
            <label tabIndex="0" htmlFor="post-image-input" className="border-2 bg-red-500 rounded-full p-3 text-neutral-100 font-bold hover:cursor-pointer transition-transform hover:scale-110 hover:bg-red-600 dark:hover:bg-red-600 focus:scale-110"><AiOutlinePicture className="text-2xl"/></label>
            <input className="hidden" type="file" name="image-upload" id="post-image-input" accept="image/*" onChange={(e) => handleImageUpload(e)}/>
          </div>
            )
          : (
            <div className="sb-content-wrapper">
              <TextareaAutosize onChange={validateText} ref={textareaRef} className="sb-text-area bg-neutral-100 dark:neutral-bg-900" placeholder="Text goes here" />
              <div className="relative text-3xl rounded">
                <button className="absolute top-3 left-3 rounded-full hover:cursor-pointer text-neutral-100 bg-neutral-900" onClick={() => setUploadedImage({ preview: '', file: null })}>
                  <MdOutlineClose />
                </button>
                <img src={uploadedImage.preview} className="sb-image" />
              </div>
            </div>
            )}
            <div className="w-full flex justify-end">
              <button disabled={snapCollectionMutation.isLoading} className="min-h-[36px] border-2 bg-red-500 rounded-full px-4 text-neutral-100 text-lg font-bold transition-transform hover:scale-110 hover:hover:bg-red-600 dark:hover:bg-red-600" onClick={(e) => handleSubmit(e)}>
                Snap
              </button>
            </div>
            <div className="w-full text-red-500 text-center">
              {error}
            </div>
      </div>
    </div>
  )
}

CreateSnap.propTypes = {
  userData: PropTypes.object
}
