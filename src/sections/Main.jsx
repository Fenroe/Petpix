import React from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import Notifications from '../pages/Notifications'
import Likes from '../pages/Likes'
import Profile from '../pages/Profile'
import Albums from '../pages/Albums'
import Snap from '../pages/Snap'

export default function Main () {
  return (
    <HashRouter>
      <main className="main">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path ="/notifications" element={<Notifications />} />
          <Route exact path="/likes" element={<Likes />} />
          <Route exact path="/profile/:id" element={<Profile />} />
          <Route exact path="/albums" element={<Albums />} />
          <Route exact path="/snap" element={<Snap />} />
          <Route path="/login" element={<Navigate replace to="/" />}/>
          <Route path="signup" element={<Navigate replace to="/" />}/>
        </Routes>
      </main>
    </HashRouter>
  )
}
