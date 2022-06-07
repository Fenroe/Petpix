import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { ImLocation2 } from 'react-icons/im'
import { BsCalendar3 } from 'react-icons/bs'
import { ProfilePicture } from '../components/ProfilePicture'
import { UserContext } from '../contexts/UserContext'
import { returnMonthAndYear } from '../utils/returnMonthandYear'
import { ProfileSnaps } from '../components/ProfileSnaps'
import { ProfileAlbums } from '../components/ProfileAlbums'
import { UpdateProfile } from '../components/UpdateProfile'
import { useUpdate } from '../hooks/useUpdate'
import { getProfileData } from '../firebase'
import { CoverPicture } from '../components/CoverPicture'

export const Profile = ({ snapFeedData, sync }) => {
  const [viewing, setViewing] = useState('snaps')

  const [viewEditProfile, setViewEditProfile] = useState(false)

  const [profileInfo, setProfileInfo] = useState()

  const { user, setUser } = useContext(UserContext)

  const { id } = useParams()

  const update = useUpdate(setUser)

  const openEditProfile = () => {
    setViewEditProfile(true)
  }

  const closeEditProfile = () => {
    setViewEditProfile(false)
  }

  const formatFollowerText = (followers) => {
    if (followers === 1) return 'Follower'
    return 'Followers'
  }

  const viewSnaps = () => {
    setViewing('snaps')
  }

  const viewAlbums = () => {
    setViewing('albums')
  }

  useEffect(() => {
    sync()
  }, [])

  useEffect(() => {
    if (id === user.userId) {
      setProfileInfo(user)
    } else {
      getProfileData(id).then((result) => setProfileInfo(result))
    }
  }, [user, id])

  // if there is no profileInfo set the page loads
  // if this is the user's profile they see an edit profile button
  // if this profile is followed by the user they see an unfollow button
  // if this profile isn't followed by the user they see a follow button
  return (
    <section className="page">
      {profileInfo
        ? (
              <div className="w-full">
              <div className="w-full mb-3">
                <div className="w-full h-80 bg-slate-500">
                <CoverPicture url={profileInfo.coverPicture} />
                </div>
                <div className="flex h-16 justify-end items-start relative w-full">
                  <div className="absolute left-3 bottom-0">
                    <ProfilePicture url={profileInfo.profilePicture} size="large" />
                  </div>
                  {profileInfo.userId === user.userId
                    ? (
                    <div className="p-3">
                      <button onClick={openEditProfile} className="follow-button">Edit profile</button>
                    </div>
                      )
                    : (
                        null
                      )}
                  {profileInfo.userId !== user.userId && profileInfo.followedBy.includes(user.userId)
                    ? (
                    <div className="p-3">
                      <button onClick={openEditProfile} className="follow-button">Unfollow</button>
                    </div>
                      )
                    : (
                        null
                      )}
                  {profileInfo.userId !== user.userId && !profileInfo.followedBy.includes(user.userId)
                    ? (
                    <div className="p-3">
                      <button onClick={openEditProfile} className="follow-button">Follow</button>
                    </div>
                      )
                    : (
                        null
                      )}
                </div>
                <div className="h-16 flex items-center p-3">
                  <h1 className="text-2xl font-bold">{profileInfo.username}</h1>
                </div>
                <div className="h-16 p-3">
                  <p>{profileInfo.bio}</p>
                </div>
                <div className="h-10 p-3 flex gap-3">
                  <div className="flex gap-1">
                    <ImLocation2 />
                    <span>{profileInfo.location}</span>
                  </div>
                  <div className="flex gap-1">
                    <BsCalendar3 />
                    <span>Joined {returnMonthAndYear(profileInfo.joinedOn.toDate())}</span>
                  </div>
                </div>
                <div className="h-8 p-3 flex gap-1">
                  <span className="font-bold">{profileInfo.followedBy.length}</span>
                  <span>{formatFollowerText(profileInfo.followedBy.length)}</span>
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
              { viewing === 'snaps' ? <ProfileSnaps feedData={snapFeedData} userId={profileInfo.userId}/> : <ProfileAlbums />}
              {viewEditProfile ? <UpdateProfile closeModal={closeEditProfile} setRecentlyUpdated={update} /> : null}
            </div>
          )
        : (
        <h1>Loading</h1>
          )}
    </section>
  )
}

Profile.propTypes = {
  snapFeedData: PropTypes.array,
  sync: PropTypes.func
}
