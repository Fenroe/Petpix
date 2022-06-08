import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchAlbum } from '../firebase'
import { AlbumCover } from '../components/AlbumCover'

export const Album = () => {
  const [albumInfo, setAlbumInfo] = useState({
    contents: []
  })

  const { id } = useParams()

  useEffect(() => {
    fetchAlbum(id, setAlbumInfo)
  }, [])

  return (
    <div className="p-3">
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
          <button className="follow-button">Click me</button>
        </div>
      </div>
      <div>
        {albumInfo.contents.map((image) =>
        <img key={albumInfo.contents.indexOf(image)} src={image} />)}
      </div>
    </div>
  )
}
