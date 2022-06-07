import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { SnapFeedItem } from './SnapFeedItem'
import { getNewKey } from '../utils/generateKey'
import { useFeedInterval } from '../hooks/useFeedInterval'
import { EmptyFeed } from './EmptyFeed'
import { returnFeedMessage } from '../utils/returnFeedMessage'
import { UserContext } from '../contexts/UserContext'

export const SnapFeed = ({ feedName, feedData }) => {
  const { user } = useContext(UserContext)

  useFeedInterval()

  return (
    <section className="feed">
      {feedData.length === 0 ? <EmptyFeed message={returnFeedMessage(feedName)}/> : null}
      {feedData.map((item) => !user.hiddenSnaps.includes(item.id)
        ? <SnapFeedItem
          key={getNewKey.next().value}
          id={item.id}
          userId={item.userId}
          username={item.username}
          profilePicture={item.profilePicture}
          posted={item.posted}
          image={item.image}
          text={item.text}
          likedBy={item.likedBy} />
        : null
      )}
    </section>
  )
}

SnapFeed.propTypes = {
  feedData: PropTypes.array,
  feedName: PropTypes.oneOf(['home', 'profile', 'likes']),
  sync: PropTypes.func
}
