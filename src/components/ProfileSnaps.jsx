import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { SnapFeed } from './SnapFeed'
import { UserContext } from '../contexts/UserContext'

export const ProfileSnaps = ({ feedData, userId, username }) => {
  const { user } = useContext(UserContext)

  return (
    <>
      <div className="page-heading-wrapper">
        {userId === user.userId ? <h1 className="page-heading">Your Snaps</h1> : <h1 className="page-heading">{username}&apos;s Snaps</h1>}
      </div>
      <SnapFeed feedName={userId === user.userId ? 'my profile' : 'other profile'} feedData={feedData.filter((snap) => snap.userId === userId ? snap : null)}/>
    </>
  )
}

ProfileSnaps.propTypes = {
  feedData: PropTypes.array,
  userId: PropTypes.string,
  username: PropTypes.string
}
