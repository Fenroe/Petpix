import './style/index.css'
import React, { useState } from 'react'
import Sidebar from './sections/Sidebar'
import Main from './sections/Main'
import { UserContext } from './data/UserContext'
import defaultProfilePicture from './assets/profilePictures/the-rock.jpg'

function App () {
  const [user, setUser] = useState({
    username: 'The Rock',
    profilePicture: defaultProfilePicture,
    bio: 'smell what im cooking',
    location: 'the rock\'s house',
    joinedOn: new Date(2022, 4, 13),
    snaps: [],
    likes: [],
    albums: [],
    notifications: []
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
