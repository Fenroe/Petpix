import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { UserContext } from '../contexts/UserContext'
import { MdOutlineClose } from 'react-icons/md'
import { AddToAlbumItem } from './AddToAlbumItem'
import { addPictureToAlbum, removePictureFromAlbum } from '../firebase'

export const AddToAlbum = ({ close, snapPicture, snapId }) => {
  const { userAlbums, setUserAlbums } = useContext(UserContext)

  const [sortedUserAlbums, setSortedUserAlbums] = useState([])

  const handleAdd = (albumInfo, callback) => {
    const filteredUserAlbums = userAlbums.filter((album) => album.id !== albumInfo.id ? album : null)
    albumInfo.contents.push(snapPicture)
    setUserAlbums([...filteredUserAlbums, albumInfo])
    callback()
    addPictureToAlbum(albumInfo.id, snapId)
  }

  const handleRemove = (albumInfo, callback) => {
    const filteredUserAlbums = userAlbums.filter((album) => album.id !== albumInfo.id ? album : null)
    albumInfo.contents = albumInfo.contents.filter((picture) => picture !== snapPicture ? picture : null)
    setUserAlbums([...filteredUserAlbums, albumInfo])
    callback()
    removePictureFromAlbum(albumInfo.id, snapId)
  }

  useEffect(() => {
    setSortedUserAlbums(userAlbums.sort((a, b) => b.posted - a.posted))
  }, [])

  useEffect(() => {
    const closeOnEscape = (evt) => {
      if (evt.key === 'Escape') {
        close()
      }
    }
    document.addEventListener('keydown', (evt) => closeOnEscape(evt))

    return () => document.removeEventListener('keydown', (evt) => closeOnEscape(evt))
  }, [])

  return ReactDOM.createPortal(
    <>
      <div className="bg-black bg-opacity-50 fixed inset-0 z-40"/>
      <div className="fixed w-96 h-96 p-3 bg-white left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50 overflow-auto">
        <div className="flex gap-12 text-2xl mb-3">
          <button onClick={close}><MdOutlineClose /></button>
          <h1 className="font-bold text-lg">Add to album</h1>
        </div>
        {userAlbums.length === 0
          ? <div className="w-full h-3/4 flex justify-center items-center">
          <h1 className="text-lg">You don&apos;t have any albums yet</h1>
        </div>
          : null}
          {sortedUserAlbums.map((album) =>
          <AddToAlbumItem
          key={album.id}
          albumCover={album.albumCover}
          contents={album.contents}
          id={album.id}
          pinnedBy={album.pinnedBy}
          profilePicture={album.profilePicture}
          title={album.title}
          updated={album.updated}
          userId={album.userId}
          username={album.username}
          snapPicture={snapPicture}
          handleAdd={handleAdd}
          handleRemove={handleRemove}
          />)}
      </div>
    </>, document.getElementById('modal')
  )
}

AddToAlbum.propTypes = {
  close: PropTypes.func,
  snapPicture: PropTypes.string,
  snapId: PropTypes.string
}
