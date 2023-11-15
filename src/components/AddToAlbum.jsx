import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { MdOutlineClose } from 'react-icons/md'
import { AddToAlbumItem } from './AddToAlbumItem'
import { addPictureToAlbum, removePictureFromAlbum, auth, getUserAlbumsRef } from '../firebase'
import { useModalFocus } from '../hooks/useModalFocus'
import { useFirestoreQuery } from '@react-query-firebase/firestore'
import { useAuthUser } from '@react-query-firebase/auth'

export const AddToAlbum = ({ close, snapPicture }) => {
  const user = useAuthUser('user', auth)

  const userAlbums = useFirestoreQuery('userAlbums', getUserAlbumsRef(user.data.uid), {
    subscribe: true
  })

  const [modalRef, firstFocusRef] = useModalFocus()

  const handleAdd = async (albumId) => {
    await addPictureToAlbum(albumId, snapPicture)
  }

  const handleRemove = async (albumId) => {
    await removePictureFromAlbum(albumId, snapPicture)
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const unsetOverflow = () => {
      document.body.style.overflow = 'unset'
    }

    return () => unsetOverflow()
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

  useEffect(() => {
    function detectOutsideClick (evt) {
      if (!modalRef.current) return
      if (modalRef.current.contains(evt.target)) return
      close()
    }

    document.addEventListener('mousedown', detectOutsideClick)

    return () => {
      document.removeEventListener('mousedown', detectOutsideClick)
    }
  }, [])

  return ReactDOM.createPortal(
    <>
      <div className="bg-neutral-900 bg-opacity-50 fixed inset-0 z-40 overflow-y-hidden dark:bg-gray-500 dark:bg-opacity-20"/>
      <div ref={modalRef} className="fixed w-96 h-96 p-3 bg-neutral-100 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50 overflow-auto dark:bg-neutral-900 dark:text-neutral-100">
        <div className="flex gap-12 text-2xl mb-3">
          <button ref={firstFocusRef} className="transition-transform hover:scale-110 focus:scale-110" onClick={close}><MdOutlineClose /></button>
          <h1 className="font-bold text-lg">Add to album</h1>
        </div>
        {userAlbums.length === 0
          ? <div className="w-full h-3/4 flex justify-center items-center">
          <h1 className="text-lg">You don&apos;t have any albums yet</h1>
        </div>
          : null}
          {userAlbums.data?.docs?.map((album) =>
          <AddToAlbumItem
          key={album.id}
          albumCover={album.data().albumCover}
          contents={album.data().contents}
          id={album.id}
          pinnedBy={album.data().pinnedBy}
          profilePicture={album.data().profilePicture}
          title={album.data().title}
          updated={album.data().updated}
          userId={album.data().userId}
          username={album.data().username}
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
  snapPicture: PropTypes.string
}
