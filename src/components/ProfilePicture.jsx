import React from 'react'
import PropTypes from 'prop-types'

export default function ProfilePicture ({ url }) {
  return (
    <img src={url} className="h-12 w-12 rounded-full" />
  )
}

ProfilePicture.propTypes = {
  url: PropTypes.string
}
