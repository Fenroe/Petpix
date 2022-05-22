import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import ProfilePicture from './ProfilePicture'
import TextareaAutosize from 'react-textarea-autosize'
import renderTimeDifference from '../utils/renderTimeDifference'
import { GrLike } from 'react-icons/gr'
import { BiPhotoAlbum } from 'react-icons/bi'
import { UserContext } from '../data/UserContext'

export default function SnapFeedItem ({ userProfilePicture, username, timestamp, image, text, likes }) {
  const [isLiked, setIsLiked] = useState(false)

  const { user, setUser } = useContext(UserContext)

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
            <span> {renderTimeDifference(timestamp)}</span>
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

SnapFeedItem.propTypes = {
  userProfilePicture: PropTypes.string,
  username: PropTypes.string,
  timestamp: PropTypes.object,
  image: PropTypes.string,
  text: PropTypes.string,
  likes: PropTypes.number
}
