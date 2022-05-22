import React from 'react'
import NotificationsFeed from '../components/NotificationsFeed'

export default function Notifications () {
  return (
    <section className="page">
      <div className="page-heading-wrapper">
        <h1 className="page-heading">Your notifications</h1>
        <NotificationsFeed feedName="notifications" />
      </div>
    </section>
  )
}
