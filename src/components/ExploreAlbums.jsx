import React, { useState, useContext } from 'react'
import AlbumFeed from './AlbumFeed'
import { UserContext } from '../data/UserContext'

export default function MyAlbums () {
  const { user } = useContext(UserContext)

  const [sortBy, setSortBy] = useState('newest')

  function sortFeedData (method) {
    let sortedFeed = []
    switch (method) {
      case 'newest': {
        sortedFeed = user.albums.sort((a, b) => b.lastUpdated - a.lastUpdated)
        break
      }
      case 'most pinned': {
        sortedFeed = user.albums.sort((a, b) => b.pins - a.pins)
        break
      }
    }
    return sortedFeed
  }

  return (
    <>
      <div className="flex items-center p-3 gap-3">
        <h2 className="text-lg font-bold">Sort by: </h2>
        <select onChange={(e) => setSortBy(e.target.value)}name="" id="" className="bg-white text-lg outline-none">
          <option value="newest">Newest</option>
          <option value="most pinned">Most pinned</option>
        </select>
      </div>
      <AlbumFeed feedName='my albums' feedData={sortFeedData(sortBy)} />
    </>
  )
}
