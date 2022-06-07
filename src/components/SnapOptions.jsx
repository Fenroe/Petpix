import React, { useEffect, useRef, useContext } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { UserContext } from '../contexts/UserContext'
import { deleteSnap, hideSnap } from '../firebase'

export const SnapOptions = ({ position, snapUserId, snapId, closeMenu }) => {
  const { user, setUser } = useContext(UserContext)

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

  return ReactDOM.createPortal(
    <>
      <div className="menu-underlay" />
      <div style={{ left: position.x, top: position.y }} className="absolute w-48 h-16 z-50 bg-white drop-shadow-lg" ref={menuRef}>
        {user.userId === snapUserId
          ? (
          <button className="flex items-center justify-center w-full h-16" onClick={handleDelete}>
            <span>Delete this Snap</span>
          </button>
            )
          : (
          <button className="flex items-center justify-center w-full h-16" onClick={handleHide}>
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
