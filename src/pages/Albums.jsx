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
      <div className="w-full">
        <button className="w-1/2" onClick={viewMyAlbums}>
          <h2 className="text-xl font-bold hover:bg-red-500 hover:text-white">My Albums</h2>
        </button>
        <button className="w-1/2" onClick={viewExploreAlbums}>
          <h2 className="text-xl font-bold hover:bg-red-500 hover:text-white">Explore Albums</h2>
        </button>
      </div>
      {viewing === 'my albums' ? <MyAlbums /> : <ExploreAlbums />}
    </section>
  )
}
