import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { deleteSnap, hideSnap, auth } from '../firebase'
import { useAuthUser } from '@react-query-firebase/auth'

export const SnapOptions = ({ snapUserId, snapId, closeMenu }) => {
  const user = useAuthUser('user', auth)

  const menuRef = useRef(null)

  const handleHide = () => {
    hideSnap(snapId)
  }

  const handleDelete = () => {
    deleteSnap(snapId)
  }

  useEffect(() => {
    function detectOutsideClick (evt) {
      if (!menuRef.current) return
      if (menuRef.current.contains(evt.target)) return
      closeMenu()
    }

    document.addEventListener('mousedown', detectOutsideClick)

    return () => {
      document.removeEventListener('mousedown', detectOutsideClick)
    }
  }, [])

  useEffect(() => {
    const closeOnEscape = (evt) => {
      if (evt.key === 'Escape') {
        closeMenu()
      }
    }
    document.addEventListener('keydown', (evt) => closeOnEscape(evt))

    return () => document.removeEventListener('keydown', (evt) => closeOnEscape(evt))
  }, [])

  return (
    <div className="absolute top-0 -right-52 w-48 h-16 z-50 bg-neutral-100 drop-shadow-lg" ref={menuRef}>
      {user.data.uid === snapUserId
        ? (
        <button className="flex items-center justify-center w-full h-16 bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-800 dark:bg-neutral-900 dark:text-neutral-100" onClick={handleDelete}>
          <span>Delete this Snap</span>
        </button>
          )
        : (
        <button className="flex items-center justify-center w-full h-16 bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-800 dark:bg-neutral-900 dark:text-neutral-100" onClick={handleHide}>
          <span>Hide this Snap</span>
        </button>
          )}
    </div>
  )
}

SnapOptions.propTypes = {
  position: PropTypes.object,
  snapUserId: PropTypes.string,
  snapId: PropTypes.string,
  closeMenu: PropTypes.func,
  sync: PropTypes.func
}
