import React from 'react'

export const AddToAlbumItem = ({ id, title, }) => {
  return (
    <div className="w-full p-3 flex justify-between items-center" key={album.id}>
    <h1 className="text-lg font-bold">{album.title}</h1>
    {album.contents.includes(snapPicture) ? <button className="follow-button w-20">Remove</button> : <button onClick={() => handleAdd(album.id)} className="follow-button w-20">Add</button>}
  </div>)}
  )
}
