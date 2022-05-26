import React, { useContext } from 'react'
import AlbumFeed from './AlbumFeed'
import { UserContext } from '../data/UserContext'

export default function ProfileAlbums () {
  const { user } = useContext(UserContext)

  return (
    <>
      <div className="page-heading-wrapper">
        <h1 className="page-heading">Your albums</h1>
      </div>
      <AlbumFeed feedName='my albums' feedData={user.albums.filter((album) => album.albumOwner === user.username ? album : null)} />
    </>
  )
}
