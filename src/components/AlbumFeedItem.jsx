import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import returnMonthAndYear from '../utils/returnMonthandYear'
import { UserContext } from '../data/UserContext'

export default function AlbumFeedItem ({ id, coverImage, title, albumOwner, lastUpdated }) {
  const { user, setUser } = useContext(UserContext)

  function removeFromAlbums (evt) {
    evt.preventDefault()
    const filteredAlbums = user.albums.filter((album) => album.id !== id ? album : null)
    setUser((prevState) => ({
      ...prevState,
      albums: filteredAlbums
    }))
  }

  return (
    <a className="justify-between flex items-center gap-3">
      <div className="flex items-center gap-3">
        <img src={coverImage} className="h-10 w-10 rounded-lg" />
        <div className="flex flex-col justify-start items-start">
          <div className="flex flex-col">
            <div className="flex gap-3 items-center">
              <span className="font-bold text-lg">{title}</span>
              <span className="text-sm">{albumOwner}</span>
            </div>
            <span>last updated {returnMonthAndYear(lastUpdated)}</span>
          </div>
        </div>
      </div>
      {albumOwner === user.username
        ? (
        <button className="follow-button" onClick={(e) => removeFromAlbums(e)}>Delete</button>
          )
        : (
        <button className="follow-button" onClick={(e) => removeFromAlbums(e)}>Remove</button>
          )}
    </a>
  )
}

AlbumFeedItem.propTypes = {
  id: PropTypes.number,
  coverImage: PropTypes.string,
  title: PropTypes.string,
  albumOwner: PropTypes.string,
  lastUpdated: PropTypes.object
}
