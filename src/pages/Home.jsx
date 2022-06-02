import React, { useEffect, useState, useContext } from 'react'
import CreateSnap from '../components/CreateSnap'
import SnapFeed from '../components/SnapFeed'
import { db } from '../firebase'
import { collection, query, getDocs, where, limit } from 'firebase/firestore'
import { UserContext } from '../data/UserContext'

export default function Home () {
  const [feedData, setFeedData] = useState([])

  const [sortBy, setSortBy] = useState('newest')

  const [loading, setLoading] = useState(false)

  const { recentSnaps, setRecentSnaps } = useContext(UserContext)

  function sortFeedData (method) {
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

  useEffect(() => {
    async function fetchHomeSnaps () {
      const snapQuery = query(collection(db, 'snaps'), where('id', '!=', 'test'), limit(25))
      const docs = await getDocs(snapQuery)
      const snaps = []
      docs.forEach((doc) => {
        const snap = {
          id: doc.data().id,
          userId: doc.data().userId,
          username: doc.data().username,
          profilePicture: doc.data().profilePicture,
          posted: doc.data().posted.toDate(),
          image: doc.data().image,
          text: doc.data().text,
          likedBy: doc.data().likedBy
        }
        snaps.push(snap)
      })
      setFeedData(snaps)
    }

    setRecentSnaps([])
    setLoading(true)
    fetchHomeSnaps().then(() => setLoading(false))
  }, [])

  useEffect(() => {
    setFeedData([...feedData, ...recentSnaps])
  }, [recentSnaps])

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
      {loading
        ? (
        <h1>Loading</h1>
          )
        : (
        <SnapFeed feedName="home" feedData={sortFeedData(sortBy)}/>
          )}

    </section>
  )
}
