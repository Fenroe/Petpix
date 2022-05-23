import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import ProfilePicture from './ProfilePicture'
import TextareaAutosize from 'react-textarea-autosize'
import renderTimeDifference from '../utils/renderTimeDifference'
import { GrLike } from 'react-icons/gr'
import { BiPhotoAlbum } from 'react-icons/bi'
import { UserContext } from '../data/UserContext'
import { snapCollection } from '../data/snapCollection'

export default function SnapFeedItem ({ id, userProfilePicture, username, timestamp, image, text, likes }) {
  const { user, setUser } = useContext(UserContext)

  function handleLikeClick (evt) {
    const snapIndex = snapCollection.findIndex((snap) => snap.id === id)
    const filteredLikes = user.likes.filter((snap) => snap.id !== id ? snap : null)
    if (!filteredLikes || filteredLikes.length === user.likes.length) {
      snapCollection[snapIndex].likes += 1
      filteredLikes.push(snapCollection[snapIndex])
    } else {
      snapCollection[snapIndex].likes -= 1
    }
    setUser((prevState) => ({
      ...prevState,
      likes: filteredLikes
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
              <button className="flex gap-3 items-center" onClick={(e) => handleLikeClick(e)}>
                <GrLike />
                <span>{likes}</span>
              </button>
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
  id: PropTypes.number,
  userProfilePicture: PropTypes.string,
  username: PropTypes.string,
  timestamp: PropTypes.object,
  image: PropTypes.string,
  text: PropTypes.string,
  likes: PropTypes.number
}
