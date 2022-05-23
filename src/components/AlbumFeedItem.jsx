import React from 'react'
import PropTypes from 'prop-types'
import returnMonthAndYear from '../utils/returnMonthandYear'

export default function AlbumFeedItem ({ coverImage, title, albumOwner, lastUpdated }) {
  return (
    <a className="justify-between flex items-center gap-3">
      <div className="flex items-center gap-3">
        <img src={coverImage} className="h-10 w-10 rounded-lg" />
        <div className="flex flex-col justify-start items-start">
          <div className="flex flex-col">
            <div className="flex gap-3 items-center">
              <span className="font-bold text-lg">{title}</span>
              <span className="text-sm">{albumOwner}</span>
            </div>
            <span>last updated {returnMonthAndYear(lastUpdated)}</span>
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
  albumOwner: PropTypes.string,
  lastUpdated: PropTypes.object
}
