import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { UserContext } from '../data/UserContext'
import { deleteSnap } from '../firebase'

export default function SnapOptions ({ snapUserId, snapId, closeMenu, update }) {
  const { user } = useContext(UserContext)

  async function handleDelete () {
    await deleteSnap(snapId)
    closeMenu()
    await update(true)
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
  update: PropTypes.func
}
