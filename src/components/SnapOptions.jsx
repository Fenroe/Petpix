import React, { useEffect, useRef, useContext } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { UserContext } from '../contexts/UserContext'
import { deleteSnap, hideSnap } from '../firebase'

export const SnapOptions = ({ position, snapUserId, snapId, closeMenu }) => {
  const { user, setUser, localDeletedSnaps, setLocalDeletedSnaps } = useContext(UserContext)

  const menuRef = useRef(null)

  const handleHide = () => {
    closeMenu()
    setUser((prevState) => ({
      ...prevState,
      hiddenSnaps: [...user.hiddenSnaps, snapId]
    }))
    hideSnap(snapId)
  }

  const handleDelete = () => {
    closeMenu()
    setLocalDeletedSnaps([...localDeletedSnaps, snapId])
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

  return ReactDOM.createPortal(
    <>
      <div className="menu-underlay" />
      <div style={{ left: position.x, top: position.y }} className="absolute w-48 h-16 z-50 bg-white drop-shadow-lg" ref={menuRef}>
        {user.userId === snapUserId
          ? (
          <button className="flex items-center justify-center w-full h-16 bg-white hover:brightness-90 dark:bg-black dark:text-white dark:hover:bg-neutral-900" onClick={handleDelete}>
            <span>Delete this Snap</span>
          </button>
            )
          : (
          <button className="flex items-center justify-center w-full h-16 bg-white hover:brightness-90 dark:bg-black dark:text-white dark:hover:bg-neutral-900" onClick={handleHide}>
            <span>Hide this Snap</span>
          </button>
            )}
      </div>
    </>, document.getElementById('menu')
  )
}

SnapOptions.propTypes = {
  position: PropTypes.object,
  snapUserId: PropTypes.string,
  snapId: PropTypes.string,
  closeMenu: PropTypes.func,
  sync: PropTypes.func
}
