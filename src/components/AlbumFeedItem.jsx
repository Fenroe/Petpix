import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { UserContext } from '../contexts/UserContext'
import defaultAlbumCover from '../assets/defaults/album.jpg'
import { pinAlbum, unpinAlbum, deleteAlbum } from '../firebase'

export const AlbumFeedItem = ({ id, albumCover, title, userId, username, profilePicture, updated, posted, pinnedBy }) => {
  const { user, userAlbums, setUserAlbums, pinnedAlbums, setPinnedAlbums } = useContext(UserContext)

  const [isPinned, setIsPinnsed] = useState(false)

  const handleDelete = () => {
    setUserAlbums(userAlbums.filter((album) => album.id !== id ? album : null))
    deleteAlbum(id)
  }

  const formatPinsText = (pins) => {
    if (pins === 1) return 'pin'
    return 'pins'
  }

  const handlePin = () => {
    setPinnedAlbums([...pinnedAlbums, {
      id,
      albumCover,
      title,
      userId,
      username,
      profilePicture,
      updated,
      posted,
      pinnedBy
    }])
    setIsPinnsed(true)
    pinnedBy.push(user.userId)
    pinAlbum(id, user.userId)
  }

  const handleUnpin = () => {
    setPinnedAlbums(pinnedAlbums.filter((album) => album.id !== id ? album : null))
    setIsPinnsed(false)
    pinnedBy.pop()
    unpinAlbum(id, user.userId)
  }

  useEffect(() => {
    if (pinnedAlbums.some((album) => album.id === id)) setIsPinnsed(true)
  }, [])

  return (
    <div className="justify-between flex items-center gap-3 bg-white hover:brightness-95">
      <div className="flex items-center gap-3">
        <img src={albumCover || defaultAlbumCover} className="h-10 w-10 rounded-lg" />
        <div className="flex flex-col justify-start items-start">
          <div className="flex flex-col">
            <div className="flex gap-3 items-center">
              <Link to={`/album/${id}`}className="font-bold text-lg">{title}</Link>
              <span className="text-sm">{username}</span>
            </div>
            <span>{`${pinnedBy.length} ${formatPinsText(pinnedBy.length)}`}</span>
          </div>
        </div>
      </div>
      {userId === user.userId
        ? (
        <button className="follow-button" onClick={handleDelete}>Delete</button>
          )
        : (
            null
          )}
      {userId !== user.userId && isPinned
        ? (
        <button className="follow-button" onClick={handleUnpin}>Unpin</button>
          )
        : (
            null
          )}
      {userId !== user.userId && !isPinned
        ? (
        <button className="follow-button" onClick={handlePin}>Pin</button>
          )
        : (
            null
          )}
    </div>
  )
}

AlbumFeedItem.propTypes = {
  id: PropTypes.string,
  albumCover: PropTypes.string,
  title: PropTypes.string,
  userId: PropTypes.string,
  updated: PropTypes.object,
  posted: PropTypes.object,
  pinnedBy: PropTypes.array,
  username: PropTypes.string,
  profilePicture: PropTypes.string
}
