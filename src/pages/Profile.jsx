import React, { useState, useContext } from 'react'
import { ImLocation2 } from 'react-icons/im'
import { BsCalendar3 } from 'react-icons/bs'
import ProfilePicture from '../components/ProfilePicture'
import { UserContext } from '../data/UserContext'
import returnMonthAndYear from '../utils/returnMonthandYear'
import ProfileSnaps from '../components/ProfileSnaps'
import ProfileAlbums from '../components/ProfileAlbums'
import UpdateProfile from '../components/UpdateProfile'

export default function Profile () {
  const [viewing, setViewing] = useState('snaps')

  const [viewEditProfile, setViewEditProfile] = useState(false)

  const { user } = useContext(UserContext)

  function openEditProfile () {
    setViewEditProfile(true)
  }

  function closeEditProfile () {
    setViewEditProfile(false)
  }

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
      <div className="profile-cover-img relative">
        <img className="h-full w-full object-cover"src={user.coverPicture} />
      </div>
      <div className="profile-top-wrapper">
        <div className="profile-top-left-wrapper relative">
          <div className="profile-top-left">
            <ProfilePicture url={user.profilePicture} size="large" />
          </div>
        </div>
        <button className="follow-button" onClick={openEditProfile}>Edit Profile</button>
      </div>
      <div className="profile-info-wrapper">
        <h1 className="profile-username">{user.username}</h1>
      </div>
      <div className="profile-info-wrapper">
        <p>{user.bio}</p>
      </div>
      <div className="profile-bot-wrapper">
        {user.location !== ''
          ? (
          <div className="profile-bot-info">
            <ImLocation2 />
            <span>{user.location}</span>
          </div>
            )
          : (
              null
            )}

        <div className="profile-bot-info">
          <BsCalendar3 />
          <span>joined {returnMonthAndYear(user.joinedOn.toDate())}</span>
        </div>
      </div>
      <div className="profile-followers-wrapper">
        <span className="profile-followers-text">{formatFollowerText(user.followers)}</span>
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
      {viewEditProfile ? <UpdateProfile closeModal={closeEditProfile}/> : null}
    </section>
  )
}
