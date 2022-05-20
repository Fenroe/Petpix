import React from 'react'
import Post from './Post'
import NewsFeed from './NewsFeed'
import newsFeedData from '../data/newsFeedData'

export default function Home () {
  return (
    <div className="w-full flex flex-col items-center">
      <Post />
      <NewsFeed newsFeedData={newsFeedData.sort((a, b) => b.timestamp - a.timestamp)}/>
    </div>
  )
}
