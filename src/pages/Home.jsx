import React from 'react'
import Snap from '../components/Snap'
import NewsFeed from '../components/NewsFeed'
import newsFeedData from '../data/newsFeedData'

export default function Home () {
  return (
    <section className="page">
      <Snap />
      <NewsFeed newsFeedData={newsFeedData.sort((a, b) => b.timestamp - a.timestamp)}/>
    </section>
  )
}
