import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { UserContext } from '../contexts/UserContext'
import { MdOutlineClose } from 'react-icons/md'

export const AddToAlbum = ({ close, snapPicture }) => {
  const { userAlbums, setUserAlbums } = useContext(UserContext)

  const handleAdd = (id) => {
    const mappedUserAlbums = userAlbums
    mappedUserAlbums.forEach((album) => {
      if (album.id === id) {
        album.contents.push(snapPicture)
      }
    })
    setUserAlbums(mappedUserAlbums)
  }

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
        {userAlbums.map((album) =>
        <div className="w-full p-3 flex justify-between items-center" key={album.id}>
          <h1 className="text-lg font-bold">{album.title}</h1>
          {album.contents.includes(snapPicture) ? <button className="follow-button w-20">Remove</button> : <button onClick={() => handleAdd(album.id)} className="follow-button w-20">Add</button>}
        </div>)}
      </div>
    </>, document.getElementById('modal')
  )
}

AddToAlbum.propTypes = {
  close: PropTypes.func,
  snapPicture: PropTypes.string
}
