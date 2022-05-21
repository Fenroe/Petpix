import React from 'react'
import { ImLocation2 } from 'react-icons/im'
import { BsCalendar3 } from 'react-icons/bs'
import ProfilePicture from '../components/ProfilePicture'
import defaultProfilePicture from '../assets/profilePictures/the-rock.jpg'
import NewsFeed from '../components/NewsFeed'

export default function ProfilePage () {
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
        <h1 className="font-bold">The Rock</h1>
      </div>
      <div className="w-full my-3">
        <p>smell what im cooking</p>
      </div>
      <div className="w-full flex gap-3">
        <div className="flex items-center gap-1">
          <ImLocation2 />
          <span>the rocks house</span>
        </div>
        <div className="flex items-center gap-1">
          <BsCalendar3 />
          <span>joined May 2022</span>
        </div>
      </div>
      <NewsFeed />
    </section>
  )
}
