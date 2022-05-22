import React from 'react'
import PropTypes from 'prop-types'
import ProfilePicture from './ProfilePicture'
import returnNotificationText from '../utils/returnNotificationText'
import renderTimeDifference from '../utils/renderTimeDifference'

export default function NotificationsFeedItem ({ profilePicture, link, action, fromUser, timestamp }) {
  return (
    <a className="flex" href={link}>
      <ProfilePicture url={profilePicture} size="small" />
      <div className="flex">
        <span>{returnNotificationText(action, fromUser)}</span>
        <span>{renderTimeDifference(timestamp)}</span>
      </div>
    </a>
  )
}

NotificationsFeedItem.propTypes = {
  profilePicture: PropTypes.string,
  link: PropTypes.string,
  action: PropTypes.string,
  fromUser: PropTypes.string,
  timestamp: PropTypes.object
}
