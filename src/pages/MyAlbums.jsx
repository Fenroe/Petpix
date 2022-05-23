import React, { useContext } from 'react'
import AlbumFeed from '../components/AlbumFeed'
import { UserContext } from '../data/UserContext'

export default function MyAlbums () {
  const { user } = useContext(UserContext)
  return (
    <section className="page">
      <div className="page-heading-wrapper">
        <h1 className="page-heading">Your albums</h1>
      </div>
      <AlbumFeed feedName='albums' feedData={user.albums} />
    </section>
  )
}
