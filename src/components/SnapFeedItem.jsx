import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import ProfilePicture from './ProfilePicture'
import TextareaAutosize from 'react-textarea-autosize'
import renderTimeDifference from '../utils/renderTimeDifference'
import { GrLike } from 'react-icons/gr'
import { BiPhotoAlbum } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import SnapOptions from './SnapOptions'
import { UserContext } from '../data/UserContext'
import { likeSnap, unlikeSnap } from '../firebase'

export default function SnapFeedItem ({ id, userId, username, profilePicture, posted, image, text, likedBy, update }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const [liked, setLiked] = useState(false)

  const { user } = useContext(UserContext)

  function closeMenu () {
    setMenuOpen(false)
  }

  function openMenu () {
    setMenuOpen(true)
  }

  function handleLike () {
    likedBy.push(user.userId)
    setLiked(true)
    likeSnap(id, user.userId)
  }

  function handleUnlike () {
    // pop because it doesn't matter what userId is removed, but this might cause bugs if decided later that behaviour should change
    likedBy.pop()
    setLiked(false)
    unlikeSnap(id, user.userId)
  }

  useEffect(() => {
    if (likedBy.includes(user.userId)) {
      setLiked(true)
    }
  }, [])

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
            {liked
              ? (
              <button className="flex gap-3 items-center text-blue-500 font-bold" onClick={handleUnlike}>
                <GrLike />
                <span>{likedBy.length}</span>
              </button>
                )
              : (
              <button className="flex gap-3 items-center" onClick={handleLike}>
                <GrLike />
                <span>{likedBy.length}</span>
              </button>
                )}

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
