import React from 'react'
import PropTypes from 'prop-types'
// import generateKey from '../utils/generateKey'

export default function AlbumFeed ({ feedData }) {
  const caughtFeedData = feedData || []

  return (
    <section>
      {caughtFeedData.length === 0 ? <h1>No albums</h1> : null}
    </section>
  )
}

AlbumFeed.propTypes = {
  feedData: PropTypes.array
}
