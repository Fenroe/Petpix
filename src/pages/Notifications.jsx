import React, { useContext } from 'react'
import { NotificationsFeed } from '../components/NotificationsFeed'
import { UserContext } from '../data/UserContext'

export const Notifications = () => {
  const { user } = useContext(UserContext)

  return (
    <section className="page">
      <div className="page-heading-wrapper">
        <h1 className="page-heading">Your notifications</h1>
      </div>
      <NotificationsFeed feedName="notifications" feedData={user.notifications} />
    </section>
  )
}
