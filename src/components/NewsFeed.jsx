import React from 'react'
import PropTypes from 'prop-types'
import NewsFeedItem from './NewsFeedItem'
import generateKey from '../utils/keyGenerator'

export default function NewsFeed ({ newsFeedData }) {
  const getKey = generateKey()

  if (!newsFeedData || newsFeedData.length === 0) {
    return (
      <section>
        <h1>There&apos;s nothing here</h1>
      </section>
    )
  }
  return (
    <section>
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
