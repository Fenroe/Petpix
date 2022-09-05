import React, { useState /* useContext */ } from 'react'
import PropTypes from 'prop-types'
import { AlbumFeed } from './AlbumFeed'
// import { UserContext } from '../data/UserContext'
import { CreateAlbum } from './CreateAlbum'

export const MyAlbums = ({ myAlbums, pinnedAlbums }) => {
  const [viewModal, setViewModal] = useState(false)

  // const { user } = useContext(UserContext)

  const openModal = () => {
    setViewModal(true)
  }

  const closeModal = () => {
    setViewModal(false)
  }

  return (
    <>
      {viewModal ? <CreateAlbum closeModal={closeModal}/> : null}
      <div className="flex items-center justify-between pr-3">
        <div className="page-heading-wrapper">
          <h1 className="page-heading text-center">Your albums</h1>
        </div>
      </div>
      <AlbumFeed feedName='my albums' feedData={myAlbums} />
      <div className="flex justify-center items-center w-full">
        <button className="follow-button text-xl" onClick={openModal}>New Album</button>
      </div>
      <div className="flex items-center justify-between">
        <div className="page-heading-wrapper">
          <h1 className="page-heading text-center">Pinned Albums</h1>
        </div>
      </div>
      <AlbumFeed feedName="pinned albums" feedData={pinnedAlbums} />
    </>
  )
}

MyAlbums.propTypes = {
  myAlbums: PropTypes.array,
  pinnedAlbums: PropTypes.array
}
