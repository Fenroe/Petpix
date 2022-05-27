import React, { useState } from 'react'
import MyAlbums from '../components/MyAlbums'
import ExploreAlbums from '../components/ExploreAlbums'

export default function Albums () {
  const [viewing, setViewing] = useState('my albums')

  function viewMyAlbums () {
    setViewing('my albums')
  }

  function viewExploreAlbums () {
    setViewing('explore albums')
  }

  return (
    <section>
      <div className="page-heading-wrapper">
        <h1 className="page-heading">Albums</h1>
      </div>
      <div className="view-btn-wrapper">
        <button className="view-btn" onClick={viewMyAlbums}>
          <h2 className="view-btn-text">My Albums</h2>
        </button>
        <button className="view-btn" onClick={viewExploreAlbums}>
          <h2 className="view-btn-text">Explore Albums</h2>
        </button>
      </div>
      {viewing === 'my albums' ? <MyAlbums /> : <ExploreAlbums />}
    </section>
  )
}
