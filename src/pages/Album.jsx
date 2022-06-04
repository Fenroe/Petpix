import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchAlbum } from '../firebase'
import AlbumCover from '../components/AlbumCover'

export default function Album () {
  const [albumInfo, setAlbumInfo] = useState({})

  const { id } = useParams()

  useEffect(() => {
    fetchAlbum(id, setAlbumInfo)
  }, [])

  return (
    <div className="p-3">
      <div className="flex justify-between">
        <div className="p-3 w-full flex gap-6">
          <AlbumCover url={albumInfo.albumCover} />
          <div className="flex flex-col">
            <div className="flex flex-col gap-6">
              <h1 className="text-3xl">{albumInfo.title}</h1>
              <h2 className="text-xl">By {albumInfo.username}</h2>
            </div>
          </div>
        </div>
        <div className="p-3">
          <button className="follow-button">Click me</button>
        </div>
      </div>
    </div>
  )
}
