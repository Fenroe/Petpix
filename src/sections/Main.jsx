import React, { useState, useEffect, useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Notifications } from '../pages/Notifications'
import { Likes } from '../pages/Likes'
import { Profile } from '../pages/Profile'
import { Albums } from '../pages/Albums'
import { Album } from '../pages/Album'
import { onSnapshot } from 'firebase/firestore'
import { snapCollection, albumCollection } from '../firebase'
import { Sidebar } from './Sidebar'
import { ProfileSetup } from '../components/ProfileSetup'
import { UserContext } from '../data/UserContext'

export const Main = () => {
  const [snaps, setSnaps] = useState([])

  const [albums, setAlbums] = useState([])

  const { user } = useContext(UserContext)

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
      onSnapshot(albumCollection, (snapshot) => {
        const albumsData = []
        snapshot.forEach((doc) => {
          if (!doc.data().id) return
          const album = {
            ...doc.data(),
            posted: doc.data().posted.toDate(),
            updated: doc.data().updated.toDate()
          }
          albumsData.push(album)
        })
        setAlbums(albumsData)
      }),
    []
  )

  return (
    <>
      {user.setup === false ? <ProfileSetup /> : null}
      <Sidebar />
      <main className="main">
        <Routes>
          <Route exact path="/" element={<Home feedData={snaps} />} />
          <Route exact path ="/notifications" element={<Notifications />} />
          <Route exact path="/likes" element={<Likes feedData={snaps}/>} />
          <Route exact path="/profile/:id" element={<Profile snapFeedData={snaps} albumFeedData={albums} />} />
          <Route exact path="/albums/" element={<Albums feedData={albums} />} />
          <Route exact path="/album/:id" element={<Album />} />
          <Route path="*" element={<Navigate replace to="/" />}/>
        </Routes>
      </main>
    </>
  )
}
