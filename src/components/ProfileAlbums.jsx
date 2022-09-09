import React from 'react'
import PropTypes from 'prop-types'
import { AlbumFeed } from './AlbumFeed'
import { useFirestoreQuery } from '@react-query-firebase/firestore'
import { getUserAlbumsRef, auth } from '../firebase'
import { useAuthUser } from '@react-query-firebase/auth'

export const ProfileAlbums = ({ userId, username }) => {
  const user = useAuthUser('user', auth)

  const albumsQuery = useFirestoreQuery(`albums${userId}`, getUserAlbumsRef(userId), {
    subscribe: true
  })

  return (
    <>
      <div className="page-heading-wrapper">
        {userId === user.data.uid ? <h1 className="page-heading">Your albums</h1> : <h1 className="page-heading">{username}&apos;s albums</h1>}
      </div>
      {albumsQuery.isSuccess && <AlbumFeed feedName='my albums' feedData={albumsQuery.data.docs} />}
    </>
  )
}

ProfileAlbums.propTypes = {
  feedData: PropTypes.array,
  userId: PropTypes.string,
  username: PropTypes.string
}
