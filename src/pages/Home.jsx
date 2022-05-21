import React from 'react'
import Snap from '../components/Snap'
import NewsFeed from '../components/NewsFeed'
import newsFeedData from '../data/newsFeedData'

export default function Home () {
  return (
    <section className="w-full flex flex-col items-center">
      <Snap />
      <NewsFeed newsFeedData={newsFeedData.sort((a, b) => b.timestamp - a.timestamp)}/>
    </section>
  )
}
