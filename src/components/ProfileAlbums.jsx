import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { AlbumFeed } from './AlbumFeed'
import { UserContext } from '../contexts/UserContext'

export const ProfileAlbums = ({ feedData, userId, username }) => {
  const { user } = useContext(UserContext)

  return (
    <>
      <div className="page-heading-wrapper">
        {userId === user.userId ? <h1 className="page-heading">Your albums</h1> : <h1 className="page-heading">{username}&apos;s albums</h1>}
      </div>
      <AlbumFeed feedName='my albums' feedData={feedData} />
    </>
  )
}

ProfileAlbums.propTypes = {
  feedData: PropTypes.array,
  userId: PropTypes.string,
  username: PropTypes.string
}
