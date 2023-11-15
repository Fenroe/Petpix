import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { returnFeedMessage } from '../utils/returnFeedMessage'
import { returnFeedData } from '../utils/returnFeedData'
import { EmptyFeed } from './EmptyFeed'
import defaultAlbumCover from '../assets/defaults/album.jpg'
import { pinAlbum, unpinAlbum, deleteAlbum, auth } from '../firebase'
import { useAuthUser } from '@react-query-firebase/auth'

export const AlbumFeed = ({ feedName, feedData }) => {
  const user = useAuthUser('user', auth)

  const formatPinsText = (pins) => {
    if (pins === 1) return 'pin'
    return 'pins'
  }

  const handleDelete = (id) => {
    deleteAlbum(id)
  }

  const handlePin = (id) => {
    pinAlbum(id, user.data.uid)
  }

  const handleUnpin = (id) => {
    unpinAlbum(id, user.data.uid)
  }

  return (
    <section className="feed">
      {returnFeedData(feedData).length === 0 && <EmptyFeed message={returnFeedMessage(feedName)} />}
      {returnFeedData(feedData).map((item) =>
          <div key={item.data().id} className="justify-between flex items-center gap-3 bg-neutral-100 hover:brightness-95 dark:bg-neutral-900 dark:text-neutral-100">
          <div className="flex items-center gap-3">
            <img src={item.data()?.albumCover || defaultAlbumCover} className="h-10 w-10 rounded-lg" />
            <div className="flex flex-col justify-start items-start">
              <div className="flex flex-col">
                <div className="flex gap-3 items-center">
                  <Link to={`/album/${item.data()?.id}`}className="font-bold text-lg">{item.data()?.title}</Link>
                  <span className="text-sm">{item.data()?.username}</span>
                </div>
                <span>{`${item.data()?.pinnedBy?.length} ${formatPinsText(item.data()?.pinnedBy?.length)}`}</span>
              </div>
            </div>
          </div>
          {item.data()?.userId === user.data.uid &&
            <button className="follow-button" onClick={() => handleDelete(item.data()?.id)}>Delete</button>}
          {item.data()?.userId !== user.data.uid && item.data()?.pinnedBy?.includes(user?.data?.uid) &&
            <button className="follow-button" onClick={() => handleUnpin(item.data()?.id)}>Unpin</button>}
          {item.data()?.userId !== user.data.uid && !item.data()?.pinnedBy?.includes(user?.data?.uid) &&
            <button className="follow-button" onClick={() => handlePin(item.data()?.id)}>Pin</button>}
        </div>)}
    </section>
  )
}

AlbumFeed.propTypes = {
  feedName: PropTypes.string,
  feedData: PropTypes.array
}
