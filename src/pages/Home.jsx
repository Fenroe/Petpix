import React, { useState } from 'react'
import CreateSnap from '../components/CreateSnap'
import SnapFeed from '../components/SnapFeed'
import { snapCollection } from '../data/snapCollection'

export default function Home () {
  const [sortBy, setSortBy] = useState('newest')

  function sortFeedData (method) {
    let sortedFeed = []
    switch (method) {
      case 'newest': {
        sortedFeed = snapCollection.sort((a, b) => b.timestamp - a.timestamp)
        break
      }
      case 'most liked': {
        sortedFeed = snapCollection.sort((a, b) => b.likes - a.likes)
        break
      }
    }
    return sortedFeed
  }

  return (
    <section className="page">
      <CreateSnap />
      <div className="sort-wrapper">
        <label htmlFor="sort" className="sort-label">Sort by: </label>
        <select onChange={(e) => setSortBy(e.target.value)}name="sort" id="sort" className="sort-input">
          <option value="newest">Newest</option>
          <option value="most liked">Most liked</option>
        </select>
      </div>
      <div className="page-heading-wrapper">
        <h1 className="page-heading">See what&apos;s new</h1>
      </div>
      <SnapFeed feedName="home" feedData={sortFeedData(sortBy)}/>
    </section>
  )
}
