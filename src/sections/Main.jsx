import React from 'react'
import SearchBar from '../components/SearchBar'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Notifications from '../pages/Notifications'
import Likes from '../pages/Likes'
import Profile from '../pages/Profile'
import Albums from '../pages/Albums'
import Snap from '../pages/Snap'
import SearchResults from '../pages/SearchResults'

export default function Main () {
  return (
    <main className="main">
      <section className="main-header">
        <SearchBar />
      </section>
      <HashRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path ="/notifications" element={<Notifications />} />
            <Route exact path="/likes" element={<Likes />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/albums" element={<Albums />} />
            <Route exact path="/snap" element={<Snap />} />
            <Route exact path="/search" element={<SearchResults />} />
          </Routes>
      </HashRouter>
    </main>
  )
}
