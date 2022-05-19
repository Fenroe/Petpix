import React from 'react'
import PropTypes from 'prop-types'
import ProfilePicture from './ProfilePicture'
import TextareaAutosize from 'react-textarea-autosize'

export default function NewsFeedItem ({ userProfilePicture, username, timestamp, image, text, likes }) {
  return (
    <div className="story-box">
      <div className="sb-profile-picture-wrapper">
        <a href="/">
          <ProfilePicture url={userProfilePicture} />
        </a>
      </div>
      <div className="w-full">
        <div className="sb-content-wrapper">
          <div className="flex items-center">
            <span>{username}</span>
            <span>- {timestamp}</span>
          </div>
          {text ? <TextareaAutosize readOnly className="sb-text-area" value={text}/> : null}
          <div className="sb-image-wrapper">
            <img src={image} className="sb-image" />
          </div>
          <div className="flex items-center">{likes}</div>
        </div>
      </div>
    </div>
  )
}

NewsFeedItem.propTypes = {
  userProfilePicture: PropTypes.string,
  username: PropTypes.string,
  timestamp: PropTypes.number,
  image: PropTypes.string,
  text: PropTypes.string,
  likes: PropTypes.number
}
