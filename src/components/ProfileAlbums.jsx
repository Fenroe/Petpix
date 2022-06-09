import React from 'react'
import PropTypes from 'prop-types'
import { AlbumFeed } from './AlbumFeed'

export const ProfileAlbums = ({ feedData }) => {
  return (
    <>
      <div className="page-heading-wrapper">
        <h1 className="page-heading">Your albums</h1>
      </div>
      <AlbumFeed feedName='my albums' feedData={feedData} />
    </>
  )
}

ProfileAlbums.propTypes = {
  feedData: PropTypes.array
}
