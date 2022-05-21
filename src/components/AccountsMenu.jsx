import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import ProfilePicture from './ProfilePicture'

export default function AccountMenu ({ image, username, setMenuIsVisible }) {
  const menuRef = useRef(null)

  useEffect(() => {
    function detectOutsideClick (evt) {
      if (!menuRef.current) return
      if (menuRef.current.contains(evt.target)) return
      setMenuIsVisible(false)
    }

    document.addEventListener('mousedown', detectOutsideClick)

    return () => {
      document.removeEventListener('mousedown', detectOutsideClick)
    }
  }, [])

  return (
    <div className="absolute w-80 bottom-20 left-4 bg-white rounded-md drop-shadow-lg z-[99]" ref={menuRef}>
      <div className="flex items-center w-full h-20">
        <ProfilePicture url={image} size="small" />
        <span className="ml-3 text-lg text-left font-bold">{username}</span>
      </div>
      <button onClick={() => setMenuIsVisible(false)} className="w-full h-14 p-4">
        <span className="text-lg">Settings</span>
      </button>
      <button onClick={() => setMenuIsVisible(false)} className="w-full h-14 p-4">
        <span className="text-lg">Log out</span>
      </button>
    </div>
  )
}

AccountMenu.propTypes = {
  image: PropTypes.string,
  username: PropTypes.string,
  setMenuIsVisible: PropTypes.func
}
