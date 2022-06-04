import React from 'react'
import PropTypes from 'prop-types'
import albumCover from '../assets/defaults/album.jpg'

export default function AlbumCover ({ url }) {
  return (
    <img src={url || albumCover} className="h-48 rounded-lg aspect-[4/5] object-cover"/>
  )
}

AlbumCover.propTypes = {
  url: PropTypes.string,
  size: PropTypes.string
}
