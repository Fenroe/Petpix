import React from 'react'
import PropTypes from 'prop-types'
import NewsFeedItem from './NewsFeedItem'
import generateKey from '../utils/generateKey'

export default function NewsFeed ({ newsFeedData }) {
  const getKey = generateKey()

  return (
    <section className="flex flex-col gap-3">
      {newsFeedData.length === 0 ? <h1>There&apos;s nothing here</h1> : null}
      {newsFeedData.map((item) => {
        return <NewsFeedItem
        key={getKey.next().value}
        userProfilePicture={item.userProfilePicture}
        username={item.username}
        timestamp={item.timestamp}
        image={item.image}
        text={item.text}
        likes={item.likes}/>
      })}
    </section>
  )
}

NewsFeed.propTypes = {
  newsFeedData: PropTypes.array
}
