import React from 'react'
import NotificationsFeed from '../components/NotificationsFeed'
import { notifications } from '../data/notifications'

export default function Notifications () {
  return (
    <section className="page">
      <div className="page-heading-wrapper">
        <h1 className="page-heading">Your notifications</h1>
      </div>
      <NotificationsFeed feedName="notifications" feedData={notifications} />
    </section>
  )
}
