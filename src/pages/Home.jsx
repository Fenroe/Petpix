import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CreateSnap } from '../components/CreateSnap'
import { SnapFeed } from '../components/SnapFeed'

export const Home = ({ feedData }) => {
  const [sortBy, setSortBy] = useState('newest')

  const sortFeedData = (method) => {
    let sortedFeed = []
    switch (method) {
      case 'newest': {
        sortedFeed = feedData.sort((a, b) => b.posted - a.posted)
        break
      }
      case 'most liked': {
        sortedFeed = feedData.sort((a, b) => b.likes - a.likes)
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
          <option value="newest">Recent</option>
          <option value="most liked">Most liked</option>
        </select>
      </div>
      <div className="page-heading-wrapper">
        <h1 className="page-heading">See what&apos;s new</h1>
      </div>
      <SnapFeed feedName="home" feedData={sortFeedData(sortBy)} />
    </section>
  )
}

Home.propTypes = {
  feedData: PropTypes.array
}
