import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ProfilePicture from './ProfilePicture'
import { appSignOut } from '../firebase'

export default function AccountMenu ({ image, username, setMenuIsVisible }) {
  const menuRef = useRef(null)

  async function handleSignOut () {
    await appSignOut()
    setMenuIsVisible(false)
  }

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

  return ReactDOM.createPortal(
    <>
      <div className="menu-underlay" />
      <div className="account-menu-wrapper" ref={menuRef}>
        <div className="account-menu-info-wrapper">
          <ProfilePicture url={image} size="small" />
          <span className="account-menu-info-text">{username}</span>
        </div>
        <button onClick={() => setMenuIsVisible(false)} className="account-menu-item">
          <span className="account-menu-item-text">Settings</span>
        </button>
        <button onClick={handleSignOut} className="account-menu-item">
          <span className="account-menu-item-text">Log out</span>
        </button>
      </div>
    </>, document.getElementById('menu')
  )
}

AccountMenu.propTypes = {
  image: PropTypes.string,
  username: PropTypes.string,
  setMenuIsVisible: PropTypes.func
}
