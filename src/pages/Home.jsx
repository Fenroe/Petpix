import React from 'react'
import CreateSnap from '../components/CreateSnap'
import SnapFeed from '../components/SnapFeed'
import newsFeedData from '../data/newsFeedData'

export default function Home () {
  return (
    <section className="page">
      <CreateSnap />
      <div className="page-heading-wrapper">
        <h1 className="page-heading">See what&apos;s new</h1>
      </div>
      <SnapFeed feedName="home" feedData={newsFeedData.sort((a, b) => b.timestamp - a.timestamp)}/>
    </section>
  )
}
