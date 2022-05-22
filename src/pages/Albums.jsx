import React from 'react'
import AlbumFeed from '../components/AlbumFeed'

export default function Albums () {
  return (
    <section className="page">
      <div className="page-heading-wrapper">
        <h1 className="page-heading">Your albums</h1>
      </div>
      <AlbumFeed />
    </section>
  )
}
