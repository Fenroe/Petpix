import React, { useContext } from 'react'
import { ImLocation2 } from 'react-icons/im'
import { BsCalendar3 } from 'react-icons/bs'
import ProfilePicture from '../components/ProfilePicture'
import defaultProfilePicture from '../assets/profilePictures/the-rock.jpg'
import SnapFeed from '../components/SnapFeed'
import { UserContext } from '../data/UserContext'
import returnMonthAndYear from '../utils/returnMonthandYear'

export default function Profile () {
  const { user } = useContext(UserContext)

  return (
    <section className="page">
      <div className="w-full h-52 bg-slate-500"></div>
      <div className="w-full h-16 flex space-between">
        <div className="relative w-full h-full">
          <div className="absolute bottom-0 left-6">
            <ProfilePicture url={defaultProfilePicture} size="large" />
          </div>
        </div>
        <button>Edit Profile</button>
      </div>
      <div className="w-full my-3">
        <h1 className="font-bold">{user.username}</h1>
      </div>
      <div className="w-full my-3">
        <p>{user.bio}</p>
      </div>
      <div className="w-full flex gap-3">
        <div className="flex items-center gap-1">
          <ImLocation2 />
          <span>{user.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <BsCalendar3 />
          <span>joined on {returnMonthAndYear(user.joinedOn)}</span>
        </div>
      </div>
      <div className="page-heading-wrapper">
        <h1 className="page-heading">Your Snaps</h1>
      </div>
      <SnapFeed feedName="profile" feedData={user.snaps.sort((a, b) => b.timestamp - a.timestamp)}/>
    </section>
  )
}
