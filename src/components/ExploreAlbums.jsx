import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { AlbumFeed } from './AlbumFeed'

export const ExploreAlbums = ({ feedData }) => {
  const [sortBy, setSortBy] = useState('new')

  const sortFeedData = (method) => {
    let sortedFeed = []
    switch (method) {
      case 'new': {
        sortedFeed = feedData.sort((a, b) => b.posted - a.posted)
        break
      }
      case 'most pinned': {
        sortedFeed = feedData.sort((a, b) => b.pinnedBy.length - a.pinnedBy.length)
        break
      }
      case 'recently updated': {
        sortedFeed = feedData.sort((a, b) => b.updated - a.updated)
      }
    }
    return sortedFeed
  }

  return (
    <>
      <div className="sort-wrapper">
        <label className="sort label">Sort by: </label>
        <select onChange={(e) => setSortBy(e.target.value)}name="" id="" className="sort-input">
          <option value="new">New</option>
          <option value="most pinned">Most pinned</option>
          <option value="recently updated">Recently Updated</option>
        </select>
      </div>
      <AlbumFeed feedName='explore albums' feedData={sortFeedData(sortBy)} />
    </>
  )
}

ExploreAlbums.propTypes = {
  feedData: PropTypes.array
}
