import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { fetchAlbum, pinAlbum, unpinAlbum, deleteAlbum } from '../firebase'
import { AlbumCover } from '../components/AlbumCover'
import { UserContext } from '../contexts/UserContext'

export const Album = () => {
  const [loading, setLoading] = useState(true)

  const [albumInfo, setAlbumInfo] = useState({
    contents: [],
    pinnedBy: []
  })

  const { user, userAlbums, setUserAlbums, pinnedAlbums, setPinnedAlbums } = useContext(UserContext)

  const { id } = useParams()

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
    pinAlbum(id, user.userId)
  }

  const handleUnpin = () => {
    setPinnedAlbums(pinnedAlbums.filter((album) => album.id !== id ? album : null))
    unpinAlbum(id, user.userId)
  }

  const handleDelete = () => {
    setUserAlbums(userAlbums.filter((album) => album.id !== id ? album : null))
    deleteAlbum(id)
  }

  useEffect(() => {
    fetchAlbum(id, setAlbumInfo).then(() => setLoading(false))
  }, [])

  return (
    <div>
      {loading
        ? <div>Loading</div>
        : <div className="p-3">
        <div className="flex flex-col drop-shadow-lg xl:flex-row xl:justify-between">
          <div className="p-3 w-full flex gap-6">
            <AlbumCover url={albumInfo.albumCover} />
            <div className="flex flex-col">
              <div className="flex flex-col gap-6">
                <h1 className="text-2xl font-bold">{albumInfo.title}</h1>
                <h2 className="text-lg">{albumInfo.username}</h2>
              </div>
            </div>
          </div>
          <div className="p-3">
          {albumInfo.userId === user.userId
            ? (
        <button className="follow-button" onClick={handleDelete}>Delete</button>
              )
            : (
                null
              )}
      {albumInfo.userId !== user.userId && albumInfo.pinnedBy.includes(user.userId)
        ? (
        <button className="follow-button" onClick={handleUnpin}>Unpin</button>
          )
        : (
            null
          )}
      {albumInfo.userId !== user.userId && !albumInfo.pinnedBy.includes(user.userId)
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
          <h1 className="text-xl">There aren&apos;t any pictures in this album</h1>
        </div>
          : null}
        <div className="w-full justify-items-center p-3 grid grid-cols-1 gap-3 xl:grid-cols-2">
          {albumInfo.contents.map((image) =>
          <img key={albumInfo.contents.indexOf(image)} className="w-72 aspect-[4/5] object-cover rounded-sm" src={image} />)}
        </div>
      </div>
}
    </div>
  )
}
