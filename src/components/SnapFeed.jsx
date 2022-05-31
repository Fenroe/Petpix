import React from 'react'
import PropTypes from 'prop-types'
import SnapFeedItem from './SnapFeedItem'
import { getNewKey } from '../utils/generateKey'
import useFeedInterval from '../hooks/useFeedInterval'
import EmptyFeed from './EmptyFeed'
import returnFeedMessage from '../utils/returnFeedMessage'

export default function SnapFeed ({ feedName, feedData }) {
  const caughtNewsFeedData = feedData || []

  useFeedInterval()

  return (
    <section className="feed">
      {caughtNewsFeedData.length === 0 ? <EmptyFeed message={returnFeedMessage(feedName)}/> : null}
      {caughtNewsFeedData.map((item) => {
        return <SnapFeedItem
        key={getNewKey.next().value}
        id={item.id}
        userId={item.userId}
        username={item.username}
        profilePicture={item.profilePicture}
        posted={item.posted}
        image={item.image}
        text={item.text}
        likedBy={item.likedBy}/>
      })}
    </section>
  )
}

SnapFeed.propTypes = {
  feedData: PropTypes.array,
  feedName: PropTypes.oneOf(['home', 'profile', 'likes'])
}
