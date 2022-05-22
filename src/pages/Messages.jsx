import React from 'react'
import MessageFeed from '../components/MessageFeed'

export default function Messages () {
  return (
    <section className="page">
      <div className="page-heading-wrapper">
        <h1 className="page-heading">Your messages</h1>
      </div>
      <MessageFeed feedName="messages" />
    </section>
  )
}
