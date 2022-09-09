import React from 'react'
import PropTypes from 'prop-types'
import { useFeedInterval } from '../hooks/useFeedInterval'
import { EmptyFeed } from './EmptyFeed'
import { returnFeedMessage } from '../utils/returnFeedMessage'
import SnapFeedItem from './SnapFeedItem'

export const SnapFeed = ({ feedName, feedData }) => {
  useFeedInterval()

  return (
    <section className="feed">
      {feedData.length === 0 && <EmptyFeed message={returnFeedMessage(feedName)}/>}
      {feedData.map((item) => item.data()?.userId &&
      <SnapFeedItem key={item.id} snapId={item.id} data={item.data()} />)}
    </section>
  )
}

SnapFeed.propTypes = {
  feedData: PropTypes.array,
  feedName: PropTypes.oneOf(['home', 'profile', 'likes', 'my profile', 'other profile'])
}
