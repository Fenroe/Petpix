import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { SnapFeed } from './SnapFeed'
import { UserContext } from '../contexts/UserContext'
import { getUserSnapsRef } from '../firebase'
import { useFirestoreQuery } from '@react-query-firebase/firestore'

export const ProfileSnaps = ({ userId, username }) => {
  const { user } = useContext(UserContext)

  const snapQuery = useFirestoreQuery(`userSnaps${userId}`, getUserSnapsRef(userId))

  return (
    <>
      <div className="page-heading-wrapper">
        {userId === user.userId ? <h1 className="page-heading">Your Snaps</h1> : <h1 className="page-heading">{username}&apos;s Snaps</h1>}
      </div>
      {snapQuery.isSuccess && <SnapFeed feedName={userId === user.userId ? 'my profile' : 'other profile'} feedData={snapQuery.data.docs}/>}
    </>
  )
}

ProfileSnaps.propTypes = {
  feedData: PropTypes.array,
  userId: PropTypes.string,
  username: PropTypes.string
}
