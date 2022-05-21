import React, { useContext } from 'react'
import NewsFeed from '../components/NewsFeed'
import { UserContext } from '../data/UserContext'

export default function Likes () {
  const { user } = useContext(UserContext)

  return (
    <section className="page">
      <h1>Liked Snaps</h1>
      <NewsFeed newsFeedData={user.likes}/>
    </section>
  )
}
