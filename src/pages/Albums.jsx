import React from 'react'
import AlbumFeed from '../components/AlbumFeed'
import { albums } from '../data/albums'

export default function Albums () {
  return (
    <section className="page">
      <div className="page-heading-wrapper">
        <h1 className="page-heading">Your albums</h1>
      </div>
      <AlbumFeed feedName='albums' feedData={albums} />
    </section>
  )
}
