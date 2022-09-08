import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useFeedInterval } from '../hooks/useFeedInterval'
import { EmptyFeed } from './EmptyFeed'
import { returnFeedMessage } from '../utils/returnFeedMessage'
import { UserContext } from '../contexts/UserContext'
import { ProfilePicture } from './ProfilePicture'
import TextareaAutosize from 'react-textarea-autosize'
import { AiOutlineLike as GrLike } from 'react-icons/ai'
import { BiPhotoAlbum } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { renderTimeDifference } from '../utils/renderTimeDifference'

export const SnapFeed = ({ feedName, feedData }) => {
  const { userData } = useContext(UserContext)

  useFeedInterval()

  return (
    <section className="feed">
      {feedData.length === 0 && <EmptyFeed message={returnFeedMessage(feedName)}/>}
      {feedData.map((item) =>
        <div className="story-box" key={item.data().id}>
          <div className="sb-profile-picture-wrapper">
            <Link to={`/profile/${item.data().userId}`}>
              <ProfilePicture url={item.data().profilePicture} size="small" />
            </Link>
          </div>
          <div className="w-full">
            <div className="sb-content-wrapper">
              <div className="text-xl flex items-center justify-between w-full relative">
                <div className="flex items-center gap-3">
                  <Link to={`/profile/${item.data().userId}`} className="font-bold hover:cursor-pointer hover:underline">{item.data().username}</Link>
                  <span> {item.data().posted && renderTimeDifference(item.data().posted.toDate())}</span>
                </div>
                <button className="transition-transform hover:scale-150 focus:scale-150">
                  <BsThreeDots />
                </button>
              </div>
              {item.data().text && <TextareaAutosize readOnly className="sb-text-area" value={item.data().text}/>}
              <div className="sb-image-wrapper">
                <img src={item.data().image} className="sb-image" />
              </div>
              <div className="flex items-center justify-around dark:bg-black">
                {item.data()?.likedBy?.includes(userData.userId)
                  ? (
                  <button className="flex gap-3 text-[22px] items-center text-blue-500 font-bold bg-white transition-transform hover:scale-125 focus:scale-125 dark:bg-black">
                    <GrLike className="dark:text-white"/>
                    <span>{item.data()?.likedBy?.length}</span>
                  </button>
                    )
                  : (
                  <button className="flex gap-3 text-[22px] items-center bg-white transition-transform hover:scale-125 focus:scale-125 dark:bg-black dark:text-white">
                    <GrLike />
                    <span>{item.data()?.likedBy?.length}</span>
                  </button>
                    )}
                <button className="text-[22px] bg-white transition-transform hover:scale-125 focus:scale-125 dark:bg-black dark:text-white">
                  <BiPhotoAlbum />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

SnapFeed.propTypes = {
  feedData: PropTypes.array,
  feedName: PropTypes.oneOf(['home', 'profile', 'likes', 'my profile', 'other profile'])
}
