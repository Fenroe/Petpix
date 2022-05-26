import React, { useContext } from 'react'
import SnapFeed from './SnapFeed'
import { UserContext } from '../data/UserContext'

export default function ProfileSnaps () {
  const { user } = useContext(UserContext)

  return (
    <>
      <div className="page-heading-wrapper">
        <h1 className="page-heading">Your Snaps</h1>
      </div>
      <SnapFeed feedName="profile" feedData={user.snaps.sort((a, b) => b.timestamp - a.timestamp)}/>
    </>
  )
}
