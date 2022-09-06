import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { MdOutlineClose } from 'react-icons/md'
import { AiOutlinePicture } from 'react-icons/ai'
import { fetchAlbum, pinAlbum, unpinAlbum, uploadAlbumCover, updateAlbumCover, deleteAlbum, getURL, removePictureFromAlbum } from '../firebase'
import { AlbumCover } from '../components/AlbumCover'
import { UserContext } from '../contexts/UserContext'

export const Album = () => {
  const [loading, setLoading] = useState(true)

  const [albumInfo, setAlbumInfo] = useState({
    contents: [],
    pinnedBy: []
  })

  const [editing, setEditing] = useState(false)

  const [isPinned, setIsPinned] = useState(false)

  const { user, userAlbums, setUserAlbums, pinnedAlbums, setPinnedAlbums } = useContext(UserContext)

  const navigate = useNavigate()

  const { id } = useParams()

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
      await updateAlbumCover(id, newAlbumCover)
      const updatedAlbumInfo = {
        ...albumInfo,
        albumCover: newAlbumCover
      }
      setAlbumInfo(updatedAlbumInfo)
      const filteredUserAlbums = userAlbums.filter((album) => album.id !== id && album)
      filteredUserAlbums.push(updatedAlbumInfo)
      setUserAlbums([...filteredUserAlbums])
    } catch (err) {
      console.log(err)
    }
  }

  const handlePin = () => {
    setPinnedAlbums([...pinnedAlbums, {
      id: albumInfo.id,
      albumCover: albumInfo.albumCover,
      title: albumInfo.title,
      userId: albumInfo.userId,
      username: albumInfo.username,
      profilePicture: albumInfo.profilePicture,
      updated: albumInfo.updated,
      posted: albumInfo.posted,
      pinnedBy: albumInfo.pinnedBy
    }])
    setIsPinned(true)
    pinAlbum(id, user.userId)
  }

  const handleUnpin = () => {
    setPinnedAlbums(pinnedAlbums.filter((album) => album.id !== id ? album : null))
    setIsPinned(false)
    unpinAlbum(id, user.userId)
  }

  const handleDelete = () => {
    setUserAlbums(userAlbums.filter((album) => album.id !== id ? album : null))
    deleteAlbum(id)
    navigate('/albums')
  }

  const handleDeletePicture = async (pictureIndex) => {
    try {
      await removePictureFromAlbum(id, albumInfo.contents[pictureIndex])
      const updatedAlbumInfo = {
        ...albumInfo,
        contents: albumInfo.contents.filter((picture) => albumInfo.contents.indexOf(picture) !== pictureIndex && picture)
      }
      setAlbumInfo(updatedAlbumInfo)
      const updatedUserAlbums = userAlbums.filter((album) => album.id !== id && album)
      updatedUserAlbums.push(updatedAlbumInfo)
      setUserAlbums(updatedUserAlbums)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchAlbum(id, setAlbumInfo).then(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (albumInfo.pinnedBy.includes(user.userId)) {
      setIsPinned(true)
    }
  }, [albumInfo])

  return (
    <div>
      {loading
        ? <div>Loading</div>
        : <div className="p-3">
        <div className="flex flex-col drop-shadow-lg xl:flex-row xl:justify-between">
          <div className="p-3 w-full flex gap-6">
            <div className="relative">
              <AlbumCover url={albumInfo.albumCover} />
              {editing === true &&
              <>
                <label tabIndex="0" htmlFor="album-cover" className="upload-image-label"><AiOutlinePicture /></label>
                <input type="file" name="album-cover" id="album-cover" accept="image/*"className="hidden" onChange={(e) => handleChangeAlbumCover(e.target.files[0])}/>
              </>}
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col gap-6 dark:text-white">
                <h1 className="text-2xl font-bold">{albumInfo.title}</h1>
                <Link to={`/profile/${albumInfo.userId}`} className="text-lg hover:text-red-500">Created by {albumInfo.username}</Link>
              </div>
            </div>
          </div>
          <div className="p-3">
          {albumInfo.userId === user.userId && !editing &&
          <button className="follow-button" onClick={handleEdit}>Edit</button>}
          {albumInfo.userId === user.userId && editing &&
          <button className="follow-button" onClick={handleFinishEditing}>Finish editing</button>}
          {albumInfo.userId === user.userId
            ? (
        <button className="follow-button" onClick={handleDelete}>Delete</button>
              )
            : (
                null
              )}
      {albumInfo.userId !== user.userId && isPinned
        ? (
        <button className="follow-button" onClick={handleUnpin}>Unpin</button>
          )
        : (
            null
          )}
      {albumInfo.userId !== user.userId && !isPinned
        ? (
        <button className="follow-button" onClick={handlePin}>Pin</button>
          )
        : (
            null
          )}
          </div>
        </div>
        {albumInfo.contents.length === 0
          ? <div className="mt-6 w-full flex items-center justify-center">
          <h1 className="text-xl dark:text-white">There aren&apos;t any pictures in this album</h1>
        </div>
          : null}
        <div className="w-full justify-items-center p-3 grid grid-cols-1 gap-3 xl:grid-cols-2">
          {albumInfo.contents.map((image) =>
          <div className="relative" key={albumInfo.contents.indexOf(image)}>
            {editing === true &&
            <button className="absolute top-3 left-3 rounded-full hover:cursor-pointer text-white bg-black text-3xl" onClick={() => handleDeletePicture(albumInfo.contents.indexOf(image))}>
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
