import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { MdOutlineClose } from 'react-icons/md'
import { AiOutlinePicture } from 'react-icons/ai'
import { auth, pinAlbum, unpinAlbum, uploadAlbumCover, deleteAlbum, getURL, removePictureFromAlbum, getAlbumDocRef } from '../firebase'
import { AlbumCover } from '../components/AlbumCover'
import { useAuthUser } from '@react-query-firebase/auth'
import { useFirestoreDocument, useFirestoreDocumentMutation } from '@react-query-firebase/firestore'

export const Album = () => {
  const [queryKey, setQueryKey] = useState(Date.now())

  const user = useAuthUser('user', auth)

  const { id } = useParams()

  const albumQuery = useFirestoreDocument(`album${id}${queryKey}`, getAlbumDocRef(id))

  const albumQueryMutation = useFirestoreDocumentMutation(getAlbumDocRef(id))

  const [editing, setEditing] = useState(false)

  const [isPinned, setIsPinned] = useState(false)

  const navigate = useNavigate()

  const handleEdit = () => {
    if (editing === true) return
    setEditing(true)
  }

  const handleFinishEditing = () => {
    if (editing === false) return
    setEditing(false)
  }

  const handleChangeAlbumCover = async (picture) => {
    try {
      if (!picture) return
      const imageRef = await uploadAlbumCover(picture)
      const newAlbumCover = await getURL(imageRef)
      albumQueryMutation.mutate({
        ...albumQuery.data.data(),
        albumCover: newAlbumCover
      })
      setQueryKey(Date.now())
    } catch (err) {
      console.log(err)
    }
  }

  const handlePin = () => {
    setIsPinned(true)
    pinAlbum(id, user.userId)
  }

  const handleUnpin = () => {
    setIsPinned(false)
    unpinAlbum(id, user.userId)
  }

  const handleDelete = async () => {
    deleteAlbum(id)
    navigate('/albums')
  }

  const handleDeletePicture = async (pictureIndex) => {
    try {
      await removePictureFromAlbum(id, albumQuery.data.data().contents[pictureIndex])
      setQueryKey(Date.now())
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (albumQuery?.data?.data()?.pinnedBy?.includes(user.data.uid)) {
      setIsPinned(true)
    }
  }, [])

  return (
    <div>
      {albumQuery.isLoading
        ? <div>Loading</div>
        : <div className="p-3">
        <div className="flex flex-col drop-shadow-lg xl:flex-row xl:justify-between">
          <div className="p-3 w-full flex gap-6">
            <div className="relative">
              <AlbumCover url={albumQuery.data?.data()?.albumCover} />
              {editing === true &&
              <>
                <label tabIndex="0" htmlFor="album-cover" className="upload-image-label"><AiOutlinePicture /></label>
                <input type="file" name="album-cover" id="album-cover" accept="image/*"className="hidden" onChange={(e) => handleChangeAlbumCover(e.target.files[0])}/>
              </>}
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col gap-6 dark:text-neutral-100">
                <h1 className="text-2xl font-bold">{albumQuery.data.data().title}</h1>
                <Link to={`/profile/${albumQuery.data.data().userId}`} className="text-lg hover:text-red-500">Created by {albumQuery.data.data().username}</Link>
              </div>
            </div>
          </div>
          <div className="p-3">
          {albumQuery.data.data().userId === user.data.uid && !editing &&
          <button className="follow-button" onClick={handleEdit}>Edit</button>}
          {albumQuery.data.data().userId === user.data.uid && editing &&
          <button className="follow-button" onClick={handleFinishEditing}>Finish editing</button>}
          {albumQuery.data.data().userId === user.data.uid
            ? (
        <button className="follow-button" onClick={handleDelete}>Delete</button>
              )
            : (
                null
              )}
      {albumQuery.data.data().userId !== user.data.uid && isPinned &&
        <button className="follow-button" onClick={handleUnpin}>Unpin</button>}
      {albumQuery.data.data().userId !== user.data.uid && !isPinned &&
        <button className="follow-button" onClick={handlePin}>Pin</button>}
          </div>
        </div>
        {albumQuery.data.data().contents.length === 0
          ? <div className="mt-6 w-full flex items-center justify-center">
          <h1 className="text-xl dark:text-neutral-100">There aren&apos;t any pictures in this album</h1>
        </div>
          : null}
        <div className="w-full justify-items-center p-3 grid grid-cols-1 gap-3 xl:grid-cols-2">
          {albumQuery.data.data().contents.map((image) =>
          <div className="relative" key={albumQuery.data.data().contents.indexOf(image)}>
            {editing === true &&
            <button className="absolute top-3 left-3 rounded-full hover:cursor-pointer text-neutral-100 bg-neutral-900 text-3xl" onClick={() => handleDeletePicture(albumQuery.data.data().contents.indexOf(image))}>
              <MdOutlineClose />
            </button>}
            <img className="w-72 aspect-[4/5] object-cover rounded-sm" src={image} />
          </div>)}
        </div>
      </div>
}
    </div>
  )
}
