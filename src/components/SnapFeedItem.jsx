import React, { useState, useContext, useEffect, memo } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ProfilePicture } from './ProfilePicture'
import TextareaAutosize from 'react-textarea-autosize'
import { renderTimeDifference } from '../utils/renderTimeDifference'
import { GrLike } from 'react-icons/gr'
import { BiPhotoAlbum } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { SnapOptions } from './SnapOptions'
import { UserContext } from '../contexts/UserContext'
import { likeSnap, unlikeSnap } from '../firebase'
import { AddToAlbum } from './AddToAlbum'

const SnapFeedItem = ({ id, userId, username, profilePicture, posted, image, text, likedBy }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const [addToAlbumOpen, setAddToAlbumOpen] = useState(false)

  const [menuPosition, setMenuPosition] = useState({
    x: null,
    y: null
  })

  const [liked, setLiked] = useState(false)

  const [loading, setLoading] = useState(false)

  const { user } = useContext(UserContext)

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const openMenu = (evt) => {
    setMenuPosition({
      x: evt.pageX,
      y: evt.pageY
    })
    setMenuOpen(true)
  }

  const openAddToAlbum = () => {
    setAddToAlbumOpen(true)
  }

  const closeAddToAlbum = () => {
    setAddToAlbumOpen(false)
  }

  const handleLike = () => {
    if (loading) return
    setLoading(true)
    likedBy.push(user.userId)
    setLiked(true)
    likeSnap(id, user.userId).then(() => setLoading(false))
  }

  const handleUnlike = () => {
    if (loading) return
    setLoading(true)
    likedBy.pop()
    setLiked(false)
    unlikeSnap(id, user.userId).then(() => setLoading(false))
  }

  useEffect(() => {
    if (likedBy.includes(user.userId)) {
      setLiked(true)
    }
  }, [])

  return (
    <>
      {addToAlbumOpen ? <AddToAlbum close={closeAddToAlbum} snapPicture={image} snapId={id}/> : null}
      <div className="story-box">
        <div className="sb-profile-picture-wrapper">
          <Link to={`/profile/${userId}`}>
            <ProfilePicture url={profilePicture} size="small" />
          </Link>
        </div>
        <div className="w-full">
          <div className="sb-content-wrapper">
            <div className="text-xl flex items-center justify-between w-full relative">
              <div className="flex items-center gap-3">
                <Link to={`/profile/${userId}`} className="font-bold hover:cursor-pointer hover:underline">{username}</Link>
                <span> {renderTimeDifference(posted)}</span>
              </div>
              <button onClick={openMenu} className="outline-none">
                <BsThreeDots />
              </button>
              {menuOpen ? <SnapOptions position={menuPosition} snapUserId={userId} snapId={id} closeMenu={closeMenu}/> : null}
            </div>
            {text ? <TextareaAutosize readOnly className="sb-text-area" value={text}/> : null}
            <div className="sb-image-wrapper">
              <img src={image} className="sb-image" />
            </div>
            <div className="flex items-center justify-around">
              {liked
                ? (
                <button className="flex gap-3 text-[22px] items-center text-blue-500 font-bold" onClick={handleUnlike}>
                  <GrLike />
                  <span>{likedBy.length}</span>
                </button>
                  )
                : (
                <button className="flex gap-3 text-[22px] items-center" onClick={handleLike}>
                  <GrLike />
                  <span>{likedBy.length}</span>
                </button>
                  )}

              <button className="text-[22px]" onClick={openAddToAlbum}>
                <BiPhotoAlbum />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
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

export default memo(SnapFeedItem)
