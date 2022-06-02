import './style/index.css'
import React, { useState } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './sections/Sidebar'
import Main from './sections/Main'
import Login from './sections/Login'
import Signup from './sections/Signup'
import { UserContext } from './data/UserContext'
import ProfileSetup from './components/ProfileSetup'
import { auth, getUserData } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'

function App () {
  const [signedIn, setSignedIn] = useState(false)

  const [user, setUser] = useState({})

  const [recentSnaps, setRecentSnaps] = useState([])

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      if (!signedIn) {
        getUserData(setUser)
        setSignedIn(true)
      }
    } else {
      setSignedIn(false)
    }
  })

  return (
    <div className="app">
      {signedIn
        ? (
        <UserContext.Provider value={{ user, setUser, recentSnaps, setRecentSnaps }}>
          {user.setup === false ? <ProfileSetup /> : null}
          <Sidebar />
          <Main />
        </UserContext.Provider>
          )
        : (
        <HashRouter>
          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route exact path ="/notifications" element={<Navigate replace to="/login" />} />
            <Route exact path="/likes" element={<Navigate replace to="/login" />} />
            <Route exact path="/profile" element={<Navigate replace to="/login" />} />
            <Route exact path="/albums" element={<Navigate replace to="/login" />} />
            <Route exact path="/snap" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<Login />}/>
            <Route path="signup" element={<Signup />}/>
          </Routes>
        </HashRouter>
          )}
    </div>
  )
}

export default App
