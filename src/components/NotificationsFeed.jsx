import React from 'react'
import PropTypes from 'prop-types'
import useFeedInterval from '../hooks/useFeedInterval'
import returnFeedData from '../utils/returnFeedData'
import returnFeedMessage from '../utils/returnFeedMessage'
import EmptyFeed from './EmptyFeed'

export default function NotificationsFeed ({ feedName, feedData }) {
  useFeedInterval()

  return (
    <section>
      {returnFeedData(feedData).length === 0 ? <EmptyFeed message={returnFeedMessage(feedName)} /> : null }
    </section>
  )
}

NotificationsFeed.propTypes = {
  feedName: PropTypes.string,
  feedData: PropTypes.array
}
