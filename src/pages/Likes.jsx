import React, { useState, useContext, useEffect } from 'react'
import SnapFeed from '../components/SnapFeed'
import { UserContext } from '../data/UserContext'
import { db } from '../firebase'
import { collection, query, getDocs, where, limit } from 'firebase/firestore'

export default function Likes () {
  const { user } = useContext(UserContext)

  const [feedData, setFeedData] = useState([])

  useEffect(() => {
    async function fetchLikedSnaps () {
      const snapQuery = query(collection(db, 'snaps'), where('likedBy', 'array-contains', user.userId), limit(25))
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

    fetchLikedSnaps()
  }, [])

  return (
    <section className="page">
      <div className="page-heading-wrapper">
        <h1 className="page-heading">Your likes</h1>
      </div>
      <SnapFeed feedName="likes" feedData={feedData}/>
    </section>
  )
}
