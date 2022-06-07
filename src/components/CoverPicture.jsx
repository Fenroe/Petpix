import React from 'react'
import PropTypes from 'prop-types'
import cover from '../assets/defaults/cover.png'

export const CoverPicture = ({ url }) => {
  return (
    <img src={url || cover} className="h-80 w-full object-cover" />
  )
}

CoverPicture.propTypes = {
  url: PropTypes.string
}
