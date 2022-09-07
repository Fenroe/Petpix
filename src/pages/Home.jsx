import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CreateSnap } from '../components/CreateSnap'
import { SnapFeed } from '../components/SnapFeed'
import { useFirestoreQuery } from '@react-query-firebase/firestore'
import { snapCollection } from '../firebase'

export const Home = () => {
  const query = useFirestoreQuery('snaps', snapCollection, {
    subscribe: true
  })

  const [sortBy, setSortBy] = useState('newest')

  const sortFeedData = (method) => {
    let sortedFeed = []
    switch (method) {
      case 'newest': {
        sortedFeed = query.data.docs.sort((a, b) => b.data()?.posted - a.data()?.posted)
        break
      }
      case 'most liked': {
        sortedFeed = query.data.docs.sort((a, b) => b.data()?.likedBy?.length - a.data()?.likedBy?.length)
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
      {!query.isLoading && <SnapFeed feedName="home" feedData={sortFeedData(sortBy)} />}
    </section>
  )
}

Home.propTypes = {
  feedData: PropTypes.array,
  pendingData: PropTypes.array,
  sync: PropTypes.func
}
