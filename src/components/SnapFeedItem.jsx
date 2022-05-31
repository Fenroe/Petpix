import React from 'react'
import PropTypes from 'prop-types'
import ProfilePicture from './ProfilePicture'
import TextareaAutosize from 'react-textarea-autosize'
import renderTimeDifference from '../utils/renderTimeDifference'
import { GrLike } from 'react-icons/gr'
import { BiPhotoAlbum } from 'react-icons/bi'

export default function SnapFeedItem ({ id, userId, username, profilePicture, posted, image, text, likedBy }) {
  return (
    <div className="story-box">
      <div className="sb-profile-picture-wrapper">
        <a href={`/#/profile/${userId}`}>
          <ProfilePicture url={profilePicture} size="small" />
        </a>
      </div>
      <div className="w-full">
        <div className="sb-content-wrapper">
          <div className="flex items-center gap-3">
            <span className="font-bold">{username}</span>
            <span> {renderTimeDifference(posted)}</span>
          </div>
          {text ? <TextareaAutosize readOnly className="sb-text-area" value={text}/> : null}
          <div className="sb-image-wrapper">
            <img src={image} className="sb-image" />
          </div>
          <div className="flex items-center justify-around">
              <button className="flex gap-3 items-center">
                <GrLike />
                <span>{likedBy.length}</span>
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
  id: PropTypes.string,
  userId: PropTypes.string,
  username: PropTypes.string,
  profilePicture: PropTypes.string,
  posted: PropTypes.object,
  image: PropTypes.string,
  text: PropTypes.string,
  likedBy: PropTypes.array
}
