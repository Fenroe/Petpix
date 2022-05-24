import React from 'react'
import PropTypes from 'prop-types'
import useFeedInterval from '../hooks/useFeedInterval'
import returnFeedData from '../utils/returnFeedData'
import returnFeedMessage from '../utils/returnFeedMessage'
import EmptyFeed from './EmptyFeed'
import NotificationsFeedItem from './NotificationsFeedItem'
import { getNewKey } from '../utils/generateKey'

export default function NotificationsFeed ({ feedName, feedData }) {
  useFeedInterval()

  return (
    <section className="w-full flex flex-col gap-3">
      {returnFeedData(feedData).length === 0 ? <EmptyFeed message={returnFeedMessage(feedName)} /> : null }
      {returnFeedData(feedData).map((item) => {
        return <NotificationsFeedItem key={getNewKey.next().value} id={item.id} profilePicture={item.profilePicture} link={item.url} action={item.action} fromUser={item.fromUser} timestamp={item.timestamp} />
      })}
    </section>
  )
}

NotificationsFeed.propTypes = {
  feedName: PropTypes.string,
  feedData: PropTypes.array
}
