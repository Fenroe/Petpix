import React from 'react'
import PropTypes from 'prop-types'
import { SnapFeed } from './SnapFeed'
import { getUserSnapsRef, auth } from '../firebase'
import { useFirestoreQuery } from '@react-query-firebase/firestore'
import { useAuthUser } from '@react-query-firebase/auth'

export const ProfileSnaps = ({ userId, username }) => {
  const user = useAuthUser('user', auth)

  const snapQuery = useFirestoreQuery(`userSnaps${userId}`, getUserSnapsRef(userId))

  return (
    <>
      <div className="page-heading-wrapper">
        {userId === user.data.uid ? <h1 className="page-heading">Your Snaps</h1> : <h1 className="page-heading">{username}&apos;s Snaps</h1>}
      </div>
      {snapQuery.isSuccess && <SnapFeed feedName={userId === user.data.uid ? 'my profile' : 'other profile'} feedData={snapQuery.data.docs}/>}
    </>
  )
}

ProfileSnaps.propTypes = {
  feedData: PropTypes.array,
  userId: PropTypes.string,
  username: PropTypes.string
}
