import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { SnapFeed } from '../components/SnapFeed'
import { UserContext } from '../data/UserContext'

export const Likes = ({ feedData }) => {
  const { user } = useContext(UserContext)

  return (
    <section className="page">
      <div className="page-heading-wrapper">
        <h1 className="page-heading">Your likes</h1>
      </div>
      <SnapFeed feedName="likes" feedData={feedData.filter((snap) => snap.likedBy.includes(user.userId) ? snap : null)}/>
    </section>
  )
}

Likes.propTypes = {
  feedData: PropTypes.array
}
