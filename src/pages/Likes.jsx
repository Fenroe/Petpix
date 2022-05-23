import React, { useContext } from 'react'
import SnapFeed from '../components/SnapFeed'
import { UserContext } from '../data/UserContext'

export default function Likes () {
  const { user } = useContext(UserContext)

  return (
    <section className="page">
      <div className="page-heading-wrapper">
        <h1 className="page-heading">Your likes</h1>
      </div>
      <SnapFeed feedName="likes" feedData={user.likes.sort((a, b) => b.timestamp - a.timestamp)}/>
    </section>
  )
}
