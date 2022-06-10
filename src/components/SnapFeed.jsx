import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import SnapFeedItem from './SnapFeedItem'
import { useFeedInterval } from '../hooks/useFeedInterval'
import { EmptyFeed } from './EmptyFeed'
import { returnFeedMessage } from '../utils/returnFeedMessage'
import { UserContext } from '../contexts/UserContext'

export const SnapFeed = ({ feedName, feedData }) => {
  const { user, localWrittenSnaps, localDeletedSnaps } = useContext(UserContext)

  const getMergedFeedData = () => {
    const feedDataIds = feedData.map((item) => item.id)
    const writtenSnapIds = localWrittenSnaps.map((item) => item.id)
    const filteredWrittenSnapIds = writtenSnapIds.filter((id) => !feedDataIds.includes(id) ? id : null)
    const filteredWrittenSnaps = localWrittenSnaps.filter((snap) => filteredWrittenSnapIds.includes(snap.id) ? snap : null)
    switch (feedName) {
      case 'likes': {
        return feedData
      }
      case 'other profile': {
        return feedData
      }
      default: {
        return [...filteredWrittenSnaps, ...feedData]
      }
    }
  }

  useFeedInterval()

  return (
    <section className="feed">
      {getMergedFeedData().length === 0 ? <EmptyFeed message={returnFeedMessage(feedName)}/> : null}
      {getMergedFeedData().map((item) => !user.hiddenSnaps.includes(item.id) && !localDeletedSnaps.includes(item.id)
        ? <SnapFeedItem
          key={item.id}
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
  feedName: PropTypes.oneOf(['home', 'profile', 'likes', 'my profile', 'other profile']),
  sync: PropTypes.func
}
