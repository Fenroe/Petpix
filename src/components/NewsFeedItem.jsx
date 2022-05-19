import React from 'react'
import PropTypes from 'prop-types'

export default function NewsFeedItem ({ username, timestamp, image, text, likes }) {
  return (
    <div></div>
  )
}

NewsFeedItem.propTypes = {
  username: PropTypes.string,
  timestamp: PropTypes.number,
  image: PropTypes.string,
  text: PropTypes.string,
  likes: PropTypes.number
}
