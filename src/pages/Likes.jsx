import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { SnapFeed } from '../components/SnapFeed'
import { UserContext } from '../contexts/UserContext'
import { useFirestoreQuery } from '@react-query-firebase/firestore'
import { getLikedSnapsRef } from '../firebase'

export const Likes = () => {
  const { user } = useContext(UserContext)

  const query = useFirestoreQuery('likedSnaps', getLikedSnapsRef(user.userId), {
    subscribe: true
  })

  getLikedSnapsRef()

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
  feedData: PropTypes.array,
  sync: PropTypes.func
}
