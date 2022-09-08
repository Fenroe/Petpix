import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { AlbumFeed } from './AlbumFeed'
import { useFirestoreQuery } from '@react-query-firebase/firestore'
import { albumCollection } from '../firebase'

export const ExploreAlbums = () => {
  const exploreAlbumsQuery = useFirestoreQuery('exploreAlbums', albumCollection)

  const [sortBy, setSortBy] = useState('new')

  const sortFeedData = (method) => {
    let sortedFeed = []
    switch (method) {
      case 'new': {
        sortedFeed = exploreAlbumsQuery.data?.docs?.sort((a, b) => b.data()?.posted - a.data()?.posted)
        break
      }
      case 'most pinned': {
        sortedFeed = exploreAlbumsQuery.data?.docs?.sort((a, b) => b.data()?.pinnedBy?.length - a.data()?.pinnedBy?.length)
        break
      }
      case 'recently updated': {
        sortedFeed = exploreAlbumsQuery.data?.docs?.sort((a, b) => b.data()?.updated - a.data()?.updated)
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
        </select>
      </div>
      <AlbumFeed feedName='explore albums' feedData={sortFeedData(sortBy)} />
    </>
  )
}

ExploreAlbums.propTypes = {
  feedData: PropTypes.array
}
