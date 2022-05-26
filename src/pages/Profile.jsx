import React, { useState, useContext } from 'react'
import { ImLocation2 } from 'react-icons/im'
import { BsCalendar3 } from 'react-icons/bs'
import ProfilePicture from '../components/ProfilePicture'
import defaultProfilePicture from '../assets/profilePictures/the-rock.jpg'
import { UserContext } from '../data/UserContext'
import returnMonthAndYear from '../utils/returnMonthandYear'
import ProfileSnaps from '../components/ProfileSnaps'
import ProfileAlbums from '../components/ProfileAlbums'

export default function Profile () {
  const [viewing, setViewing] = useState('snaps')

  const { user } = useContext(UserContext)

  function formatFollowerText (followers) {
    if (followers === 1) return `${followers} Follower`
    return `${followers} Followers`
  }

  function viewSnaps () {
    setViewing('snaps')
  }

  function viewAlbums () {
    setViewing('albums')
  }

  return (
    <section className="page">
      <div className="w-full h-52 bg-slate-500"></div>
      <div className="w-full h-16 flex space-between items-center">
        <div className="relative w-full h-full">
          <div className="absolute bottom-0 left-6">
            <ProfilePicture url={defaultProfilePicture} size="large" />
          </div>
        </div>
        <button className="follow-button">Edit Profile</button>
      </div>
      <div className="w-full my-3">
        <h1 className="font-bold text-xl">{user.username}</h1>
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
          <span>joined {returnMonthAndYear(user.joinedOn)}</span>
        </div>
      </div>
      <div className="w-full flex gap-3 mt-3">
        <span className="font-medium text-lg">{formatFollowerText(user.followers)}</span>
      </div>
      <div className="w-full border-b-2 border-b-black">
        <button className="w-1/2 p-3 hover:bg-red-500 hover:text-white" onClick={viewSnaps}>
          <h2 className="text-xl font-bold">Snaps</h2>
        </button>
        <button className="w-1/2 p-3 hover:bg-red-500 hover:text-white" onClick={viewAlbums}>
          <h2 className="text-xl font-bold">Albums</h2>
        </button>
      </div>
      { viewing === 'snaps' ? <ProfileSnaps /> : <ProfileAlbums />}
    </section>
  )
}
