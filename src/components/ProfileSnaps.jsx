import React from 'react'
import SnapFeed from './SnapFeed'

export default function ProfileSnaps () {
  return (
    <>
      <div className="page-heading-wrapper">
        <h1 className="page-heading">Your Snaps</h1>
      </div>
      <SnapFeed feedName="profile" feedData={[]}/>
    </>
  )
}
