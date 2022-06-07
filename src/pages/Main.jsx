import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from './Home'
import { Likes } from './Likes'
import { Profile } from './Profile'
import { Albums } from './Albums'
import { Album } from './Album'
import { onSnapshot } from 'firebase/firestore'
import { getUserData, snapCollection, albumCollection } from '../firebase'
import { Sidebar } from '../components/Sidebar'
import { ProfileSetup } from '../components/ProfileSetup'
import { UserContext } from '../contexts/UserContext'

export const Main = () => {
  const [user, setUser] = useState({})

  const [snaps, setSnaps] = useState([])

  const [snapsToLoad, setSnapsToLoad] = useState([])

  const [snapsToRemove, setSnapsToRemove] = useState([])

  const [localWrittenSnaps, setLocalWrittenSnaps] = useState([])

  const [localDeletedSnaps, setLocalDeletedSnaps] = useState([])

  const [albums, setAlbums] = useState([])

  const updateSnaps = () => {
    const filteredSnaps = snaps.filter((snap) => !snapsToRemove.includes(snap.id) ? snap : null)
    setSnaps([...filteredSnaps, ...snapsToLoad])
    setSnapsToLoad([])
    setSnapsToRemove([])
  }

  useEffect(() => {
    getUserData(setUser)
  }, [])

  useEffect(() => {
    let hasLoaded = false

    const unsub = onSnapshot(snapCollection, (snapshot) => {
      let newSnaps = []
      const deletedSnapIds = new Set()
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          if (!change.doc.data().posted) return
          const snap = {
            ...change.doc.data(),
            posted: change.doc.data().posted.toDate()
          }
          newSnaps.push(snap)
        }
        if (change.type === 'modified') {
          const snap = {
            ...change.doc.data(),
            posted: change.doc.data().posted.toDate()
          }
          newSnaps.push(snap)
          deletedSnapIds.add(change.doc.data().id)
        }
        if (change.type === 'removed') {
          deletedSnapIds.add(change.doc.data().id)
        }
      })
      if (hasLoaded === false && newSnaps.length > 0) {
        hasLoaded = true
        setSnaps(newSnaps)
        newSnaps = []
      }
      setSnapsToLoad([...snapsToLoad, ...newSnaps])
      setSnapsToRemove([...snapsToRemove, ...deletedSnapIds])
      console.log(hasLoaded)
    })

    return () => unsub()
  }, [])

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
    <UserContext.Provider value={{ user, setUser, localWrittenSnaps, setLocalWrittenSnaps, localDeletedSnaps, setLocalDeletedSnaps }}>
      {user.setup === false ? <ProfileSetup /> : null}
      <Sidebar />
      <main className="main">
          <Routes>
            <Route exact path="/" element={<Home feedData={snaps} sync={updateSnaps}/>} />
            <Route exact path="/likes" element={<Likes feedData={snaps} sync={updateSnaps}/>} />
            <Route exact path="/profile/:id" element={<Profile snapFeedData={snaps} albumFeedData={albums} sync={updateSnaps} />} />
            <Route exact path="/albums/" element={<Albums feedData={albums} />} />
            <Route exact path="/album/:id" element={<Album />} />
            <Route path="*" element={<Navigate replace to="/" />}/>
          </Routes>
      </main>
    </UserContext.Provider>
  )
}
