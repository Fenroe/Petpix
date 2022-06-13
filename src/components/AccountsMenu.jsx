import React, { useEffect, useRef } from 'react'
import FocusTrap from 'focus-trap-react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { ProfilePicture } from './ProfilePicture'
import { appSignOut } from '../firebase'

export const AccountMenu = ({ image, username, setMenuIsVisible }) => {
  const menuRef = useRef(null)

  const handleSignOut = async () => {
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

  useEffect(() => {
    const closeOnEscape = (evt) => {
      if (evt.key === 'Escape') {
        setMenuIsVisible(false)
      }
    }
    document.addEventListener('keydown', (evt) => closeOnEscape(evt))

    return () => document.removeEventListener('keydown', (evt) => closeOnEscape(evt))
  }, [])

  return ReactDOM.createPortal(
    <>
      <div className="menu-underlay" />
      <FocusTrap>
        <div className="account-menu-wrapper" ref={menuRef}>
          <div className="account-menu-info-wrapper">
            <ProfilePicture url={image} size="small" />
            <span className="account-menu-info-text">{username}</span>
          </div>
          <button onClick={handleSignOut} className="account-menu-item">
            <span className="account-menu-item-text">Log out</span>
          </button>
        </div>
      </FocusTrap>
    </>, document.getElementById('menu')
  )
}

AccountMenu.propTypes = {
  image: PropTypes.string,
  username: PropTypes.string,
  setMenuIsVisible: PropTypes.func
}
