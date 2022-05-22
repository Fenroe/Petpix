import React from 'react'
import PropTypes from 'prop-types'
import useFeedInterval from '../hooks/useFeedInterval'

export default function NotificationsFeed ({ feedData }) {
  useFeedInterval()

  return (
    <section>
      {}
      <h1>Hello from Notifications Feed</h1>
    </section>
  )
}

NotificationsFeed.propTypes = {
  feedData: PropTypes.array
}
