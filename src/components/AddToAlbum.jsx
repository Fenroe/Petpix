import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { UserContext } from '../contexts/UserContext'
import { MdOutlineClose } from 'react-icons/md'
import { AddToAlbumItem } from './AddToAlbumItem'
import { addPictureToAlbum, removePictureFromAlbum } from '../firebase'
import { useModalFocus } from '../hooks/useModalFocus'

export const AddToAlbum = ({ close, snapPicture, snapId }) => {
  const { userAlbums, setUserAlbums } = useContext(UserContext)

  const [sortedUserAlbums, setSortedUserAlbums] = useState([])

  const [modalRef, firstFocusRef] = useModalFocus()

  const handleAdd = async (albumInfo, callback) => {
    const filteredUserAlbums = userAlbums.filter((album) => album.id !== albumInfo.id ? album : null)
    albumInfo.contents.push(snapPicture)
    setUserAlbums([...filteredUserAlbums, albumInfo])
    callback()
    await addPictureToAlbum(albumInfo.id, snapPicture)
  }

  const handleRemove = async (albumInfo, callback) => {
    const filteredUserAlbums = userAlbums.filter((album) => album.id !== albumInfo.id ? album : null)
    albumInfo.contents = albumInfo.contents.filter((picture) => picture !== snapPicture ? picture : null)
    setUserAlbums([...filteredUserAlbums, albumInfo])
    callback()
    await removePictureFromAlbum(albumInfo.id, snapPicture)
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const unsetOverflow = () => {
      document.body.style.overflow = 'unset'
    }

    return () => unsetOverflow()
  }, [])

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
      <div className="bg-black bg-opacity-50 fixed inset-0 z-40 overflow-y-hidden dark:bg-gray-500 dark:bg-opacity-20"/>
      <div ref={modalRef} className="fixed w-96 h-96 p-3 bg-white left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50 overflow-auto dark:bg-black dark:text-white">
        <div className="flex gap-12 text-2xl mb-3">
          <button ref={firstFocusRef} className="transition-transform hover:scale-125 focus:scale-125" onClick={close}><MdOutlineClose /></button>
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
