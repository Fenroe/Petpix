import React from 'react'
import PropTypes from 'prop-types'
import returnFeedData from '../utils/returnFeedData'
import returnFeedMessage from '../utils/returnFeedMessage'
import EmptyFeed from './EmptyFeed'

export default function MessageFeed ({ feedName, feedData }) {
  return (
    <section className="">
      {returnFeedData(feedData).length === 0 ? <EmptyFeed message={returnFeedMessage(feedName)} /> : null}
    </section>
  )
}

MessageFeed.propTypes = {
  feedName: PropTypes.string,
  feedData: PropTypes.array
}
