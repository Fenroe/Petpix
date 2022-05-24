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
    <section className="w-full flex flex-col gap-3 p-3">
      {returnFeedData(feedData).length === 0 ? <EmptyFeed message={returnFeedMessage(feedName)} /> : null}
      {returnFeedData(feedData).map((item) => {
        return <AlbumFeedItem key={getNewKey.next().value} id={item.id} coverImage={item.coverImage} title={item.title} albumOwner={item.albumOwner} lastUpdated={item.lastUpdated} />
      })}
    </section>
  )
}

AlbumFeed.propTypes = {
  feedName: PropTypes.string,
  feedData: PropTypes.array
}
