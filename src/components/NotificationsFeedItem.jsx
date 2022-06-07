import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ProfilePicture } from './ProfilePicture'
import { returnNotificationText } from '../utils/returnNotificationText'
import { renderTimeDifference } from '../utils/renderTimeDifference'
import { UserContext } from '../data/UserContext'
import { MdOutlineClose } from 'react-icons/md'

export const NotificationsFeedItem = ({ id, profilePicture, link, action, fromUser, timestamp }) => {
  const { user, setUser } = useContext(UserContext)

  const removeFromNotifications = (evt) => {
    evt.preventDefault()
    const filteredNotifications = user.notifications.filter((item) => item.id !== id ? item : null)
    setUser((prevState) => ({
      ...prevState,
      notifications: filteredNotifications
    }))
  }

  return (
    <div className="flex items-center justify-between">
      <a className="flex items-center gap-3" href={link}>
        <ProfilePicture url={profilePicture} size="small" />
        <div className="flex flex-col">
          <span className="text-sm">{renderTimeDifference(timestamp)}</span>
          <span className="text-lg">{returnNotificationText(action, fromUser)}</span>
        </div>
      </a>
      <button onClick={(e) => removeFromNotifications(e)} className="">
        <MdOutlineClose />
      </button>
    </div>
  )
}

NotificationsFeedItem.propTypes = {
  id: PropTypes.number,
  profilePicture: PropTypes.string,
  link: PropTypes.string,
  action: PropTypes.string,
  fromUser: PropTypes.string,
  timestamp: PropTypes.object
}
