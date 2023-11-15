import React from 'react'
import PropTypes from 'prop-types'

export const AddToAlbumItem = ({ albumCover, contents, id, pinnedBy, profilePicture, title, updated, userId, username, snapPicture, handleAdd, handleRemove }) => {
  return (
    <div className="w-full p-3 flex justify-between items-center">
      <h1 tabIndex="0" className="text-lg font-bold transition-transform focus:scale-110 outline-none">{title}</h1>
      {contents?.includes(snapPicture) ? <button onClick={() => handleRemove(id)} className="follow-button w-32">Remove</button> : <button onClick={() => handleAdd(id)} className="follow-button w-32">Add</button>}
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
