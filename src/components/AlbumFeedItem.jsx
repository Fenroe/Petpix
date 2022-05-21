import React from 'react'
import PropTypes from 'prop-types'
import ProfilePicture from './ProfilePicture'

export default function AlbumFeedItem ({ coverImage, title, albumOwner }) {
  return (
    <a className="flex items-center space-between">
      <div className="flex items-center gao-3">
        <img src={coverImage} className="h-10 w-10 rounded-lg" />
        <div className="flex flex-col justify-start items-start">
          <div className="">
            <span className="font-bold text-lg">{title}</span>
          </div>
          <div className="flex gap-3">
            <ProfilePicture />
            <span className="">{albumOwner}</span>
          </div>
        </div>
      </div>
      <button>Add</button>
    </a>
  )
}

AlbumFeedItem.propTypes = {
  coverImage: PropTypes.string,
  title: PropTypes.string,
  albumOwner: PropTypes.string
}
