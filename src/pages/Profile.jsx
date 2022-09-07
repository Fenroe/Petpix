import React, { useState, useContext } from 'react'
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
import { getUserDocRef, followUser, unfollowUser } from '../firebase'
import { CoverPicture } from '../components/CoverPicture'
import { useFirestoreDocument } from '@react-query-firebase/firestore'

export const Profile = () => {
  const [viewing, setViewing] = useState('snaps')

  const [viewEditProfile, setViewEditProfile] = useState(false)

  const { user } = useContext(UserContext)

  const { id } = useParams()

  const profileQuery = useFirestoreDocument(`user${id}`, getUserDocRef(id))

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

  const handleFollow = () => {
    followUser(id)
  }

  const handleUnfollow = () => {
    unfollowUser(id)
  }

  const viewSnaps = () => {
    setViewing('snaps')
  }

  const viewAlbums = () => {
    setViewing('albums')
  }

  return (
    <section className="page">
      {profileQuery.isSuccess
        ? (
              <div className="w-full">
              <div className="w-full mb-3">
                <div className="w-full h-80 bg-slate-500">
                <CoverPicture url={profileQuery.data?.data()?.coverPicture} />
                </div>
                <div className="flex h-16 justify-end items-start relative w-full">
                  <div className="absolute left-3 bottom-0">
                    <ProfilePicture url={profileQuery.data?.data()?.profilePicture} size="large" />
                  </div>
                  {profileQuery.data?.data().userId === user.userId
                    ? (
                    <div className="p-3">
                      <button onClick={openEditProfile} className="follow-button">Edit profile</button>
                    </div>
                      )
                    : (
                        null
                      )}
                  {profileQuery.data?.data()?.userId !== user.userId && profileQuery.data?.data()?.followedBy?.includes(user.userId)
                    ? (
                    <div className="p-3">
                      <button onClick={handleUnfollow} className="follow-button">Unfollow</button>
                    </div>
                      )
                    : (
                        null
                      )}
                  {profileQuery.data?.data()?.userId !== user.userId && !profileQuery.data?.data()?.followedBy.includes(user.userId)
                    ? (
                    <div className="p-3">
                      <button onClick={handleFollow} className="follow-button">Follow</button>
                    </div>
                      )
                    : (
                        null
                      )}
                </div>
                <div className="h-16 flex items-center p-3">
                  <h1 className="text-2xl font-bold dark:text-white">{profileQuery.data?.data()?.username}</h1>
                </div>
                <div className="h-16 p-3">
                  <p className="dark:text-white">{profileQuery.data?.data()?.bio}</p>
                </div>
                <div className="h-10 p-3 flex gap-3">
                  {profileQuery.data?.data()?.location !== ''
                    ? <div className="flex gap-1 dark:text-white">
                    <ImLocation2 />
                    <span className="dark:text-white">{profileQuery.data?.data()?.location}</span>
                  </div>
                    : null }
                  <div className="flex gap-1 dark:text-white">
                    <BsCalendar3 />
                    <span className="dark:text-white">Joined {returnMonthAndYear(profileQuery.data?.data()?.joinedOn?.toDate())}</span>
                  </div>
                </div>
                <div className="h-8 p-3 flex gap-1">
                  <span className="font-bold dark:text-white">{profileQuery.data?.data()?.followedBy.length}</span>
                  <span className="dark:text-white">{formatFollowerText(profileQuery.data?.data()?.followedBy.length)}</span>
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
              { viewing === 'snaps' ? <ProfileSnaps userId={profileQuery.data?.data()?.userId} username={profileQuery.data?.data()?.username}/> : <ProfileAlbums userId={profileQuery.data?.data()?.userId} username={profileQuery.data?.data()?.username}/>}
              {viewEditProfile ? <UpdateProfile closeModal={closeEditProfile} /> : null}
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
  albumFeedData: PropTypes.array,
  sync: PropTypes.func
}
