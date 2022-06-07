import React, { /* useContext  */} from 'react'
import { AlbumFeed } from './AlbumFeed'
// import { UserContext } from '../data/UserContext'

export const ProfileAlbums = () => {
  return (
    <>
      <div className="page-heading-wrapper">
        <h1 className="page-heading">Your albums</h1>
      </div>
      <AlbumFeed feedName='my albums' feedData={[]} />
    </>
  )
}
