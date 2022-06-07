import './style/index.css'
import React, { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Main } from './pages/Main'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Private } from './pages/Private'
import { UserContext } from './data/UserContext'
import { auth, getUserData } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { AuthProvider } from './contexts/AuthContext'

const App = () => {
  const [signedIn, setSignedIn] = useState(false)

  const [user, setUser] = useState({})

  const [localSnaps, setlocalSnaps] = useState([])

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
      <AuthProvider>
        <UserContext.Provider value={{ user, setUser, localSnaps, setlocalSnaps }}>
          <HashRouter>
            <Routes>
              <Route path="*" element={
              <Private>
                <Main />
              </Private>
              } />
              <Route path="/login" element={<Login />}/>
              <Route path="signup" element={<Signup />}/>
            </Routes>
          </HashRouter>
        </UserContext.Provider>
      </AuthProvider>
    </div>
  )
}

export default App
