import React, { useContext } from 'react'
import AlbumFeed from './AlbumFeed'
import { UserContext } from '../data/UserContext'

export default function MyAlbums () {
  const { user } = useContext(UserContext)

  return (
    <>
      <AlbumFeed feedName='my albums' feedData={user.albums} />
    </>
  )
}
