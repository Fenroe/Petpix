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
      <AlbumFeed feedName='my albums' feedData={user.albums.filter((album) => album.albumOwner === user.username ? album : null)} />
      <button>Create Album</button>
      <div className="page-heading-wrapper">
        <h1 className="page-heading">Pinned Albums</h1>
      </div>
      <AlbumFeed feedName="pinned albums" feedData={user.albums.filter((album) => album.albumOwner !== user.username ? album : null)} />
      <a href="/#/albums">Discover Albums</a>
    </section>
  )
}
