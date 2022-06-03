import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchAlbum } from '../firebase'

export default function Album () {
  const [albumInfo, setAlbumInfo] = useState({})

  const { id } = useParams()

  useEffect(() => {
    fetchAlbum(id, setAlbumInfo).then(() => console.log(albumInfo))
  }, [])

  return (
    <h1>Hello from album no {id}</h1>
  )
}
