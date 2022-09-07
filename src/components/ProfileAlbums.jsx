import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { AlbumFeed } from './AlbumFeed'
import { UserContext } from '../contexts/UserContext'
import { useFirestoreQuery } from '@react-query-firebase/firestore'
import { getUserAlbumsRef } from '../firebase'

export const ProfileAlbums = ({ userId, username }) => {
  const { user } = useContext(UserContext)

  const albumsQuery = useFirestoreQuery(`albums${userId}`, getUserAlbumsRef(userId), {
    subscribe: true
  })

  return (
    <>
      <div className="page-heading-wrapper">
        {userId === user.userId ? <h1 className="page-heading">Your albums</h1> : <h1 className="page-heading">{username}&apos;s albums</h1>}
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
