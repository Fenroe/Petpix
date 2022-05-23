import './style/index.css'
import React, { useState } from 'react'
import Sidebar from './sections/Sidebar'
import Main from './sections/Main'
import { UserContext } from './data/UserContext'
import defaultProfilePicture from './assets/profilePictures/the-rock.jpg'
import { notificationsData } from './data/notificationsData'
import { albumsData } from './data/albumsData'
import { snapCollection } from './data/snapCollection'

function App () {
  const [user, setUser] = useState({
    username: 'The Rock',
    profilePicture: defaultProfilePicture,
    bio: 'smell what im cooking',
    location: 'the rock\'s house',
    joinedOn: new Date(2022, 4, 13),
    snaps: snapCollection.filter((snap) => snap.username === 'The Rock' ? snap : null),
    likes: [],
    albums: albumsData,
    notifications: notificationsData
  })

  return (
    <div className="flex justify-center min-h-full bg-red-400">
      <UserContext.Provider value={{ user, setUser }}>
        <Sidebar />
        <Main />
      </UserContext.Provider>
    </div>
  )
}

export default App
