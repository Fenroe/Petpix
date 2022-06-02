import React, { useState, useEffect, useContext } from 'react'
import SnapFeed from './SnapFeed'
import { db } from '../firebase'
import { collection, query, getDocs, where, limit } from 'firebase/firestore'
import { UserContext } from '../data/UserContext'

export default function ProfileSnaps () {
  const [feedData, setFeedData] = useState([])

  const { user } = useContext(UserContext)

  useEffect(() => {
    async function fetchUserSnaps () {
      const snapQuery = query(collection(db, 'snaps'), where('userId', '==', user.userId), limit(25))
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

    fetchUserSnaps()
  }, [])

  return (
    <>
      <div className="page-heading-wrapper">
        <h1 className="page-heading">Your Snaps</h1>
      </div>
      <SnapFeed feedName="profile" feedData={feedData}/>
    </>
  )
}
