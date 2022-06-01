import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ProfilePicture from './ProfilePicture'
import TextareaAutosize from 'react-textarea-autosize'
import renderTimeDifference from '../utils/renderTimeDifference'
import { GrLike } from 'react-icons/gr'
import { BiPhotoAlbum } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import SnapOptions from './SnapOptions'

export default function SnapFeedItem ({ id, userId, username, profilePicture, posted, image, text, likedBy, update }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu () {
    setMenuOpen(false)
  }

  function openMenu () {
    setMenuOpen(true)
  }

  return (
    <div className="story-box">
      <div className="sb-profile-picture-wrapper">
        <a href={`/#/profile/${userId}`}>
          <ProfilePicture url={profilePicture} size="small" />
        </a>
      </div>
      <div className="w-full">
        <div className="sb-content-wrapper">
          <div className="text-xl flex items-center justify-between w-full relative">
            <div className="flex items-center gap-3">
              <span className="font-bold">{username}</span>
              <span> {renderTimeDifference(posted)}</span>
            </div>
            <button onClick={openMenu}>
              <BsThreeDots />
            </button>
            {menuOpen ? <SnapOptions snapUserId={userId} snapId={id} closeMenu={closeMenu} update={update}/> : null}
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
  likedBy: PropTypes.array,
  update: PropTypes.func
}
