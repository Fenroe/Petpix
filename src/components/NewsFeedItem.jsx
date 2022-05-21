import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import ProfilePicture from './ProfilePicture'
import TextareaAutosize from 'react-textarea-autosize'
import { calcMinutes, calcHours, calcDays } from '../utils/calcTimeDiff'
import { GrLike } from 'react-icons/gr'
import { BiPhotoAlbum } from 'react-icons/bi'
import { UserContext } from '../data/UserContext'

export default function NewsFeedItem ({ userProfilePicture, username, timestamp, image, text, likes }) {
  const [isLiked, setIsLiked] = useState(false)

  const { user, setUser } = useContext(UserContext)

  function renderTimeDifference () {
    const currentTime = new Date()
    const timeInDays = calcDays(timestamp, currentTime)
    if (timeInDays > 0) {
      if (timeInDays > 1) return `${timeInDays} days ago`
      return 'a day ago'
    }
    const timeInHours = calcHours(timestamp, currentTime)
    if (timeInHours > 0) {
      if (timeInHours > 1) return `${timeInHours} hours ago`
      return 'an hour ago'
    }
    const timeInMinutes = calcMinutes(timestamp, currentTime)
    if (timeInMinutes > 1) return `${timeInMinutes} minutes ago`
    return 'just now'
  }

  function handleLikeClick (evt) {
    evt.preventDefault()
    setIsLiked(!isLiked)
    const userLikes = user.likes
    const likedSnap = {
      userProfilePicture,
      username,
      timestamp,
      image,
      text,
      likes
    }
    userLikes.push(likedSnap)
    setUser((prevState) => ({
      ...prevState,
      likes: userLikes
    }))
  }

  return (
    <div className="story-box">
      <div className="sb-profile-picture-wrapper">
        <a href="/">
          <ProfilePicture url={userProfilePicture} size="small" />
        </a>
      </div>
      <div className="w-full">
        <div className="sb-content-wrapper">
          <div className="flex items-center gap-3">
            <span className="font-bold">{username}</span>
            <span> {renderTimeDifference()}</span>
          </div>
          {text ? <TextareaAutosize readOnly className="sb-text-area" value={text}/> : null}
          <div className="sb-image-wrapper">
            <img src={image} className="sb-image" />
          </div>
          <div className="flex items-center justify-around">
            {isLiked
              ? (
              <button className="flex gap-3 items-center text-blue-400 font-bold" onClick={handleLikeClick}>
                <GrLike />
                <span>{likes + 1}</span>
              </button>
                )
              : (
              <button className="flex gap-3 items-center" onClick={handleLikeClick}>
                <GrLike />
                <span>{likes}</span>
              </button>
                )
          }
            <button>
              <BiPhotoAlbum />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

NewsFeedItem.propTypes = {
  userProfilePicture: PropTypes.string,
  username: PropTypes.string,
  timestamp: PropTypes.object,
  image: PropTypes.string,
  text: PropTypes.string,
  likes: PropTypes.number
}
