import React from 'react'
import PropTypes from 'prop-types'
import SnapFeed from './SnapFeed'

export default function ProfileSnaps ({ feedData, userId }) {
  return (
    <>
      <div className="page-heading-wrapper">
        <h1 className="page-heading">Your Snaps</h1>
      </div>
      <SnapFeed feedName="profile" feedData={feedData.filter((snap) => snap.userId === userId ? snap : null)}/>
    </>
  )
}

ProfileSnaps.propTypes = {
  feedData: PropTypes.array,
  userId: PropTypes.string
}
