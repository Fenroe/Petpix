import React, { useState, memo } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ProfilePicture } from './ProfilePicture'
import TextareaAutosize from 'react-textarea-autosize'
import { renderTimeDifference } from '../utils/renderTimeDifference'
import { AiOutlineLike as GrLike } from 'react-icons/ai'
import { BiPhotoAlbum } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { SnapOptions } from './SnapOptions'
import { AddToAlbum } from './AddToAlbum'
import { snapCollection, auth } from '../firebase'
import { useFirestoreDocumentMutation /* useFirestoreDocumentDeletion */ } from '@react-query-firebase/firestore'
import { useAuthUser } from '@react-query-firebase/auth'
import { doc } from 'firebase/firestore'

const SnapFeedItem = ({ data, snapId }) => {
  const [addToAlbumOpen, setAddToAlbumOpen] = useState(false)

  const [optionsMenuOpen, setOptionsMenuOpen] = useState(false)

  const user = useAuthUser('user', auth)

  const snap = doc(snapCollection, snapId)

  const snapMutation = useFirestoreDocumentMutation(snap)

  // const snapDeletion = useFirestoreDocumentDeletion(snap)

  const likeSnap = () => {
    const newLikedBy = data.likedBy
    newLikedBy.push(user.data.uid)
    snapMutation.mutate({
      ...data,
      likedBy: newLikedBy
    })
  }

  const unlikeSnap = () => {
    snapMutation.mutate({
      ...data,
      likedBy: data.likedBy.filter((userId) => userId !== user.data.uid && userId)
    })
  }

  /* const updateSnap = (snapText) => {
    snapMutation.mutate({
      text: snapText
    })
  }

  const deleteSnap = () => {
    snapDeletion.mutate()
  } */

  return (
    <>
      {addToAlbumOpen && <AddToAlbum close={() => setAddToAlbumOpen(false)} snapPicture={data.image} snapId={data.id}/>}
      <div className="story-box">
        {optionsMenuOpen && <SnapOptions snapUserId={data.userId} snapId={snapId} closeMenu={() => setOptionsMenuOpen(false)}/>}
        <div className="sb-profile-picture-wrapper">
          <Link to={`/profile/${data?.userId}`}>
            <ProfilePicture url={data?.profilePicture} size="small" />
          </Link>
        </div>
        <div className="w-full">
          <div className="sb-content-wrapper">
            <div className="text-xl flex items-center justify-between w-full relative">
              <div className="flex items-center gap-3">
                <Link to={`/profile/${data?.userId}`} className="font-bold hover:cursor-pointer hover:underline">{data.username}</Link>
                <span> {data?.posted && renderTimeDifference(data?.posted?.toDate())}</span>
              </div>
              <button onClick={() => setOptionsMenuOpen(true)} className="transition-transform hover:scale-150 focus:scale-150">
                <BsThreeDots />
              </button>
            </div>
            {data.text && <TextareaAutosize readOnly className="sb-text-area" value={data.text}/>}
            <div className="sb-image-wrapper">
              <img src={data?.image} className="sb-image" />
            </div>
            <div className="flex items-center justify-around dark:bg-black">
              {data?.likedBy?.includes(user.data.uid)
                ? (
                <button className="flex gap-3 text-[22px] items-center text-blue-500 font-bold bg-white transition-transform hover:scale-125 focus:scale-125 dark:bg-black" onClick={unlikeSnap}>
                  <GrLike className="dark:text-white"/>
                  <span>{data.likedBy?.length}</span>
                </button>
                  )
                : (
                <button className="flex gap-3 text-[22px] items-center bg-white transition-transform hover:scale-125 focus:scale-125 dark:bg-black dark:text-white" onClick={likeSnap}>
                  <GrLike />
                  <span>{data.likedBy?.length}</span>
                </button>
                  )}
              <button className="text-[22px] bg-white transition-transform hover:scale-125 focus:scale-125 dark:bg-black dark:text-white" onClick={() => setAddToAlbumOpen(true)}>
                <BiPhotoAlbum />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

SnapFeedItem.propTypes = {
  data: PropTypes.object,
  snapId: PropTypes.string
}

export default memo(SnapFeedItem)
