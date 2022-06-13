import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export const AddToAlbumItem = ({ albumCover, contents, id, pinnedBy, profilePicture, title, updated, userId, username, snapPicture, handleAdd, handleRemove }) => {
  const [albumInfo, setAlbumInfo] = useState(null)

  const [isIncluded, setIsIncluded] = useState(false)

  const markAsIncluded = () => setIsIncluded(true)

  const markNotIncluded = () => setIsIncluded(false)

  useEffect(() => {
    setAlbumInfo({
      albumCover,
      contents,
      id,
      pinnedBy,
      profilePicture,
      title,
      updated,
      userId,
      username
    })
  }, [])

  useEffect(() => {
    if (contents.includes(snapPicture)) setIsIncluded(true)
  }, [])

  return (
    <div className="w-full p-3 flex justify-between items-center">
      <h1 tabIndex="0" className="text-lg font-bold transition-transform focus:scale-125 outline-none">{title}</h1>
      {isIncluded ? <button onClick={() => handleRemove(albumInfo, markNotIncluded)} className="follow-button w-32">Remove</button> : <button onClick={() => handleAdd(albumInfo, markAsIncluded)} className="follow-button w-32">Add</button>}
    </div>
  )
}

AddToAlbumItem.propTypes = {
  albumCover: PropTypes.string,
  contents: PropTypes.array,
  id: PropTypes.string,
  pinnedBy: PropTypes.array,
  profilePicture: PropTypes.string,
  title: PropTypes.string,
  updated: PropTypes.object,
  userId: PropTypes.string,
  username: PropTypes.string,
  snapPicture: PropTypes.string,
  handleAdd: PropTypes.func,
  handleRemove: PropTypes.func
}
