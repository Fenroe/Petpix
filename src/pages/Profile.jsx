import React, { useState, useContext } from 'react'
import { ImLocation2 } from 'react-icons/im'
import { BsCalendar3 } from 'react-icons/bs'
import ProfilePicture from '../components/ProfilePicture'
import { UserContext } from '../data/UserContext'
import returnMonthAndYear from '../utils/returnMonthandYear'
import ProfileSnaps from '../components/ProfileSnaps'
import ProfileAlbums from '../components/ProfileAlbums'
import UpdateProfile from '../components/UpdateProfile'
import useUpdate from '../hooks/useUpdate'

export default function Profile () {
  const [viewing, setViewing] = useState('snaps')

  const [viewEditProfile, setViewEditProfile] = useState(false)

  const { user, setUser } = useContext(UserContext)

  const update = useUpdate(setUser)

  function openEditProfile () {
    setViewEditProfile(true)
  }

  function closeEditProfile () {
    setViewEditProfile(false)
  }

  function formatFollowerText (followers) {
    if (followers === 1) return 'Follower'
    return 'Followers'
  }

  function viewSnaps () {
    setViewing('snaps')
  }

  function viewAlbums () {
    setViewing('albums')
  }

  return (
    <section className="page">
      <div className="w-full mb-3">
        <div className="w-full h-80 bg-slate-500">
          <img src={user.coverPicture} className="h-80 w-full object-cover" />
        </div>
        <div className="flex h-16 justify-end items-start relative w-full">
          <div className="absolute left-3 bottom-0">
            <ProfilePicture url={user.profilePicture} size="large" />
          </div>
          <div className="p-3">
            <button onClick={openEditProfile}>Click me</button>
          </div>
        </div>
        <div className="h-16 flex items-center p-3">
          <h1 className="text-2xl font-bold">{user.username}</h1>
        </div>
        <div className="h-16 p-3">
          <p>{user.bio}</p>
        </div>
        <div className="h-16 p-3 flex gap-3">
          <div className="flex gap-3">
            <ImLocation2 />
            <span>{user.location}</span>
          </div>
          <div className="flex gap-3">
            <BsCalendar3 />
            <span>{returnMonthAndYear(user.joinedOn.toDate())}</span>
          </div>
        </div>
        <div className="h-8 p-3 flex gap-1">
          <span className="font-bold">{user.followers}</span>
          <span>{formatFollowerText(user.followers)}</span>
        </div>
      </div>
      <div className="view-btn-wrapper">
        <button className="view-btn" onClick={viewSnaps}>
          <h2 className="view-btn-text">Snaps</h2>
        </button>
        <button className="view-btn" onClick={viewAlbums}>
          <h2 className="view-btn-text">Albums</h2>
        </button>
      </div>
      { viewing === 'snaps' ? <ProfileSnaps /> : <ProfileAlbums />}
      {viewEditProfile ? <UpdateProfile closeModal={closeEditProfile} setRecentlyUpdated={update} /> : null}
    </section>
  )
}
