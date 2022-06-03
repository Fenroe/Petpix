import React, { useState, useEffect } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import Notifications from '../pages/Notifications'
import Likes from '../pages/Likes'
import Profile from '../pages/Profile'
import Albums from '../pages/Albums'
import Snap from '../pages/Snap'
import { onSnapshot } from 'firebase/firestore'
import { auth, snapCollection, getMyAlbumsQuery } from '../firebase'

export default function Main () {
  const [snaps, setSnaps] = useState([])

  const [myAlbums, setMyAlbums] = useState([])

  useEffect(
    () => // expected to implicitly return its unsub function on unmount
      onSnapshot(snapCollection, (snapshot) => {
        const snapData = []
        snapshot.forEach((doc) => {
          if (!doc.data().posted) return
          const snap = {
            ...doc.data(),
            posted: doc.data().posted.toDate()
          }
          snapData.push(snap)
        })
        setSnaps(snapData)
      }),
    [] // runs once
  )

  useEffect(
    () =>
      onSnapshot(getMyAlbumsQuery(auth.currentUser.uid), (snapshot) => {
        const myAlbumsData = []
        snapshot.forEach((doc) => {
          if (!doc.data().id) return
          const album = {
            ...doc.data(),
            posted: doc.data().posted.toDate(),
            edited: doc.data().posted.toDate()
          }
          myAlbumsData.push(album)
        })
        setMyAlbums(myAlbumsData)
      }),
    []
  )

  return (
    <HashRouter>
      <main className="main">
        <Routes>
          <Route exact path="/" element={<Home feedData={snaps}/>} />
          <Route exact path ="/notifications" element={<Notifications />} />
          <Route exact path="/likes" element={<Likes feedData={snaps}/>} />
          <Route exact path="/profile/:id" element={<Profile snapFeedData={snaps} />} />
          <Route exact path="/albums/:id" element={<Albums myAlbums={myAlbums} />} />
          <Route exact path="/snap" element={<Snap />} />
          <Route path="/login" element={<Navigate replace to="/" />}/>
          <Route path="signup" element={<Navigate replace to="/" />}/>
        </Routes>
      </main>
    </HashRouter>
  )
}
