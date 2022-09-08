import React from 'react'
import PropTypes from 'prop-types'
import { SnapFeed } from '../components/SnapFeed'
import { useFirestoreQuery } from '@react-query-firebase/firestore'
import { getLikedSnapsRef, auth } from '../firebase'
import { useAuthUser } from '@react-query-firebase/auth'

export const Likes = () => {
  const user = useAuthUser('user', auth)

  const query = useFirestoreQuery('likedSnaps', getLikedSnapsRef(user.data.uid), {
    subscribe: true
  })

  return (
    <section className="page">
      <div className="page-heading-wrapper">
        <h1 className="page-heading">Your likes</h1>
      </div>
      {query.isSuccess && <SnapFeed feedName="likes" feedData={query.data.docs}/>}
    </section>
  )
}

Likes.propTypes = {
  feedData: PropTypes.array
}
