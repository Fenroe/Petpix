import React, { useState, useContext, useEffect, memo } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ProfilePicture } from './ProfilePicture'
import TextareaAutosize from 'react-textarea-autosize'
import { renderTimeDifference } from '../utils/renderTimeDifference'
import { AiOutlineLike as GrLike } from 'react-icons/ai'
import { BiPhotoAlbum } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { SnapOptions } from './SnapOptions'
import { UserContext } from '../contexts/UserContext'
import { likeSnap, unlikeSnap } from '../firebase'
import { AddToAlbum } from './AddToAlbum'

const SnapFeedItem = ({ data }) => {
  const [snapData, setSnapData] = useState({
    likedBy: [],
    posted: new Date()
  })

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

  const handleLike = async () => {
    if (loading) return
    setLoading(true)
    await likeSnap(snapData.id, user.userId)
    setLiked(true)
    setLoading(false)
  }

  const handleUnlike = async () => {
    if (loading) return
    setLoading(true)
    await unlikeSnap(snapData.id, user.userId)
    setLiked(false)
    setLoading(false)
  }

  useEffect(() => {
    if (snapData.likedBy.includes(user.userId)) {
      setLiked(true)
    }
  }, [])

  useEffect(() => {
    setSnapData({
      ...data,
      posted: data.posted.toDate()
    })
  }, [data])

  return (
    <>
      {addToAlbumOpen ? <AddToAlbum close={closeAddToAlbum} snapPicture={snapData.image} snapId={snapData.id}/> : null}
      <div className="story-box">
        <div className="sb-profile-picture-wrapper">
          <Link to={`/profile/${snapData.userId}`}>
            <ProfilePicture url={snapData.profilePicture} size="small" />
          </Link>
        </div>
        <div className="w-full">
          <div className="sb-content-wrapper">
            <div className="text-xl flex items-center justify-between w-full relative">
              <div className="flex items-center gap-3">
                <Link to={`/profile/${snapData.userId}`} className="font-bold hover:cursor-pointer hover:underline">{snapData.username}</Link>
                <span> {renderTimeDifference(snapData.posted)}</span>
              </div>
              <button onClick={openMenu} className="transition-transform hover:scale-150 focus:scale-150">
                <BsThreeDots />
              </button>
              {menuOpen ? <SnapOptions position={menuPosition} snapUserId={snapData.userId} snapId={snapData.id} closeMenu={closeMenu}/> : null}
            </div>
            {snapData.text && <TextareaAutosize readOnly className="sb-text-area" value={snapData.text}/>}
            <div className="sb-image-wrapper">
              <img src={snapData.image} className="sb-image" />
            </div>
            <div className="flex items-center justify-around dark:bg-black">
              {liked
                ? (
                <button className="flex gap-3 text-[22px] items-center text-blue-500 font-bold bg-white transition-transform hover:scale-125 focus:scale-125 dark:bg-black" onClick={handleUnlike}>
                  <GrLike className="dark:text-white"/>
                  <span>{snapData.likedBy?.length}</span>
                </button>
                  )
                : (
                <button className="flex gap-3 text-[22px] items-center bg-white transition-transform hover:scale-125 focus:scale-125 dark:bg-black dark:text-white" onClick={handleLike}>
                  <GrLike />
                  <span>{snapData.likedBy?.length}</span>
                </button>
                  )}

              <button className="text-[22px] bg-white transition-transform hover:scale-125 focus:scale-125 dark:bg-black dark:text-white" onClick={openAddToAlbum}>
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
  data: PropTypes.object
}

export default memo(SnapFeedItem)
