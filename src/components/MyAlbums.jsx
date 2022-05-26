import React, { useState, useContext } from 'react'
import AlbumFeed from './AlbumFeed'
import { UserContext } from '../data/UserContext'
import CreateAlbum from './CreateAlbum'

export default function MyAlbums () {
  const [viewModal, setViewModal] = useState(false)

  const { user } = useContext(UserContext)

  function openModal () {
    setViewModal(!viewModal)
  }

  return (
    <>
      {viewModal ? <CreateAlbum /> : null}
      <div className="flex items-center justify-between pr-3">
        <div className="page-heading-wrapper">
          <h1 className="page-heading">Your albums</h1>
        </div>
        <button className="whitespace-nowrap text-black hover:text-red-500" onClick={openModal}>New Album</button>
      </div>
      <AlbumFeed feedName='my albums' feedData={user.albums.filter((album) => album.userId === user.username ? album : null)} />
      <div className="flex items-center justify-between">
        <div className="page-heading-wrapper">
          <h1 className="page-heading">Pinned Albums</h1>
        </div>
      </div>
      <AlbumFeed feedName="pinned albums" feedData={user.albums.filter((album) => album.userId !== user.username ? album : null)} />
      <a href="/#/albums">Discover Albums</a>
    </>
  )
}