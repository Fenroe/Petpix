import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from './Home'
import { Likes } from './Likes'
import { Profile } from './Profile'
import { Albums } from './Albums'
import { Album } from './Album'
import { onSnapshot } from 'firebase/firestore'
import { getUserData, getUserAlbums, getPinnedAlbums, snapCollection } from '../firebase'
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

  const [userAlbums, setUserAlbums] = useState([])

  const [pinnedAlbums, setPinnedAlbums] = useState([])

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
    getUserAlbums(setUserAlbums)
  }, [])

  useEffect(() => {
    getPinnedAlbums(setPinnedAlbums)
  }, [])

  useEffect(() => {
    let hasLoaded = false
    let filteredSnapsToLoad = snapsToLoad
    const modifiedSnapIds = new Set()
    const unsub = onSnapshot(snapCollection, (snapshot) => {
      let newSnaps = []
      const deletedSnapIds = []
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
          if (modifiedSnapIds.has(change.doc.data().id)) {
            filteredSnapsToLoad = filteredSnapsToLoad.filter((snap) => snap.id !== change.doc.data().id ? snap : null)
          }
          const snap = {
            ...change.doc.data(),
            posted: change.doc.data().posted.toDate()
          }
          newSnaps.push(snap)
          deletedSnapIds.push(change.doc.data().id)
        }
        if (change.type === 'removed') {
          deletedSnapIds.push(change.doc.data().id)
        }
      })
      if (hasLoaded === false && newSnaps.length > 0) {
        hasLoaded = true
        setSnaps(newSnaps)
        newSnaps = []
      }
      setSnapsToLoad([...filteredSnapsToLoad, ...newSnaps])
      setSnapsToRemove([...snapsToRemove, ...deletedSnapIds])
    })

    return () => unsub()
  }, [])

  return (
    <UserContext.Provider
    value={{
      user,
      setUser,
      localWrittenSnaps,
      setLocalWrittenSnaps,
      localDeletedSnaps,
      setLocalDeletedSnaps,
      userAlbums,
      setUserAlbums
    }}>
      {user.setup === false ? <ProfileSetup /> : null}
      <Sidebar />
      <main className="main">
          <Routes>
            <Route exact path="/" element={<Home feedData={snaps} sync={updateSnaps}/>} />
            <Route exact path="/likes" element={<Likes feedData={snaps} sync={updateSnaps}/>} />
            <Route exact path="/profile/:id" element={<Profile snapFeedData={snaps} albumFeedData={userAlbums} sync={updateSnaps} />} />
            <Route exact path="/albums/" element={<Albums userAlbums={userAlbums} pinnedAlbums={pinnedAlbums} />} />
            <Route exact path="/album/:id" element={<Album />} />
            <Route path="*" element={<Navigate replace to="/" />}/>
          </Routes>
      </main>
    </UserContext.Provider>
  )
}
