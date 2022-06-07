import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { UserContext } from '../data/UserContext'
import { deleteSnap } from '../firebase'

export const SnapOptions = ({ snapUserId, snapId, closeMenu }) => {
  const { user } = useContext(UserContext)

  const handleDelete = () => {
    closeMenu()
    deleteSnap(snapId)
  }

  return (
    <div className="absolute top-0 right-0 w-48 h-16 z-50 bg-white">
      {user.userId === snapUserId
        ? (
        <button className="flex items-center justify-center w-full h-16" onClick={handleDelete}>
          <span>Delete this Snap</span>
        </button>
          )
        : (
        <button className="flex items-center justify-center w-full h-16">
          <span>Hide this Snap</span>
        </button>
          )}
    </div>
  )
}

SnapOptions.propTypes = {
  snapUserId: PropTypes.string,
  snapId: PropTypes.string,
  closeMenu: PropTypes.func,
  sync: PropTypes.func
}
