import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { UserContext } from '../contexts/UserContext'
import { onSnapshot } from 'firebase/firestore'
import { getSnapDocRef } from '../firebase'
import { GrLike } from 'react-icons/gr'

export const SnapFeedItemLikes = ({ id, handleUnlike, handleLike }) => {
  const { user } = useContext(UserContext)

  const [isLiked, setIsLiked] = useState(false)

  const [likedBy, setLikedBy] = useState([])

  useEffect(() => {
    const unsub = onSnapshot(getSnapDocRef(id), (snapshot) => {
      if (snapshot.data().likedBy.length !== likedBy.length) {
        setLikedBy(snapshot.data().likedBy)
      }
    })

    return () => unsub()
  }, [])

  useEffect(() => {
    if (likedBy.includes(user.userId)) {
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }
  }, [likedBy])

  return (
    <>
      {isLiked
        ? (
      <button className="flex gap-3 items-center text-blue-500 font-bold" onClick={handleUnlike}>
        <GrLike />
        <span>{likedBy.length}</span>
      </button>
          )
        : (
      <button className="flex gap-3 items-center" onClick={handleLike}>
        <GrLike />
        <span>{likedBy.length}</span>
      </button>
          )}
    </>
  )
}

SnapFeedItemLikes.propTypes = {
  id: PropTypes.string,
  handleUnlike: PropTypes.func,
  handleLike: PropTypes.func
}
