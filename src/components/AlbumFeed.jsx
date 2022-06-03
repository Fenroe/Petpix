import React from 'react'
import PropTypes from 'prop-types'
// import generateKey from '../utils/generateKey'
import returnFeedMessage from '../utils/returnFeedMessage'
import returnFeedData from '../utils/returnFeedData'
import EmptyFeed from './EmptyFeed'
import AlbumFeedItem from './AlbumFeedItem'
import { getNewKey } from '../utils/generateKey'

export default function AlbumFeed ({ feedName, feedData }) {
  return (
    <section className="feed">
      {returnFeedData(feedData).length === 0 ? <EmptyFeed message={returnFeedMessage(feedName)} /> : null}
      {returnFeedData(feedData).map((item) => {
        return <AlbumFeedItem
        key={getNewKey.next().value}
        id={item.id}
        username={item.username}
        profilePicture={item.profilePicture}
        albumCover={item.albumCover}
        title={item.title}
        userId={item.userId}
        updated={item.updated}
        posted={item.posted}
        pinnedBy={item.pinnedBy}
        />
      })}
    </section>
  )
}

AlbumFeed.propTypes = {
  feedName: PropTypes.string,
  feedData: PropTypes.array
}
