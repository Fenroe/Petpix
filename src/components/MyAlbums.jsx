import React, { useState /* useContext */ } from 'react'
import PropTypes from 'prop-types'
import AlbumFeed from './AlbumFeed'
// import { UserContext } from '../data/UserContext'
import CreateAlbum from './CreateAlbum'

export default function MyAlbums ({ myAlbums }) {
  const [viewModal, setViewModal] = useState(false)

  // const { user } = useContext(UserContext)

  function openModal () {
    setViewModal(true)
  }

  function closeModal () {
    setViewModal(false)
  }

  return (
    <>
      {viewModal ? <CreateAlbum closeModal={closeModal}/> : null}
      <div className="flex items-center justify-between pr-3">
        <div className="page-heading-wrapper">
          <h1 className="page-heading">Your albums</h1>
        </div>
        <button className="whitespace-nowrap text-black hover:text-red-500" onClick={openModal}>New Album</button>
      </div>
      <AlbumFeed feedName='my albums' feedData={myAlbums} />
      <div className="flex items-center justify-between">
        <div className="page-heading-wrapper">
          <h1 className="page-heading">Pinned Albums</h1>
        </div>
      </div>
      <AlbumFeed feedName="pinned albums" feedData={[]} />
    </>
  )
}

MyAlbums.propTypes = {
  myAlbums: PropTypes.array
}
