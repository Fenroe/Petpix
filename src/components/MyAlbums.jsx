import React, { useState } from 'react'
import { AlbumFeed } from './AlbumFeed'
import { CreateAlbum } from './CreateAlbum'
import { useFirestoreQuery } from '@react-query-firebase/firestore'
import { getUserAlbumsRef, getPinnedAlbumsRef, auth } from '../firebase'
import { useAuthUser } from '@react-query-firebase/auth'

export const MyAlbums = () => {
  const user = useAuthUser('user', auth)

  const [viewModal, setViewModal] = useState(false)

  const userAlbumsQuery = useFirestoreQuery('myAlbums', getUserAlbumsRef(user.data.uid), {
    subscribe: true
  })

  const pinnedAlbumsQuery = useFirestoreQuery('pinnedAlbums', getPinnedAlbumsRef(user.data.uid), {
    subscribe: true
  })

  const openModal = () => {
    setViewModal(true)
  }

  const closeModal = () => {
    setViewModal(false)
  }

  return (
    <>
      {viewModal && <CreateAlbum closeModal={closeModal}/>}
      <div className="flex items-center justify-between pr-3">
        <div className="page-heading-wrapper">
          <h1 className="page-heading text-center">Your albums</h1>
        </div>
      </div>
      {userAlbumsQuery.isSuccess && <AlbumFeed feedName='my albums' feedData={userAlbumsQuery.data?.docs} />}
      <div className="flex justify-center items-center w-full">
        <button className="follow-button text-xl" onClick={openModal}>New Album</button>
      </div>
      <div className="flex items-center justify-between">
        <div className="page-heading-wrapper">
          <h1 className="page-heading text-center">Pinned Albums</h1>
        </div>
      </div>
      {pinnedAlbumsQuery.isSuccess && <AlbumFeed feedName="pinned albums" feedData={pinnedAlbumsQuery.data?.docs} />}
    </>
  )
}
