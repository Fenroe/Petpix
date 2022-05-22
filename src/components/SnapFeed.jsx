import React from 'react'
import PropTypes from 'prop-types'
import SnapFeedItem from './SnapFeedItem'
import generateKey from '../utils/generateKey'
import useFeedInterval from '../hooks/useFeedInterval'
import EmptyFeed from './EmptyFeed'
import returnFeedMessage from '../utils/returnFeedMessage'

export default function SnapFeed ({ feedName, feedData }) {
  const caughtNewsFeedData = feedData || []

  const getKey = generateKey()

  useFeedInterval()

  return (
    <section className="flex flex-col gap-3">
      {caughtNewsFeedData.length === 0 ? <EmptyFeed message={returnFeedMessage(feedName)}/> : null}
      {caughtNewsFeedData.map((item) => {
        return <SnapFeedItem
        key={getKey.next().value}
        userProfilePicture={item.userProfilePicture}
        username={item.username}
        timestamp={item.timestamp}
        image={item.image}
        text={item.text}
        likes={item.likes}/>
      })}
    </section>
  )
}

SnapFeed.propTypes = {
  feedData: PropTypes.array,
  feedName: PropTypes.oneOf(['home', 'profile', 'likes'])
}
