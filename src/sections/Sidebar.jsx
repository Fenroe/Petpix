import React, { useState, useContext } from 'react'
import { GiTurtleShell } from 'react-icons/gi'
import { RiHome7Fill } from 'react-icons/ri'
import { FiBell, FiUser } from 'react-icons/fi'
import { AiOutlineMessage, AiOutlinePlus } from 'react-icons/ai'
import { GrLike } from 'react-icons/gr'
import { BiPhotoAlbum } from 'react-icons/bi'
import IconWrapper from '../components/IconWrapper'
import AccountMenu from '../components/AccountsMenu'
import HeaderLink from '../components/HeaderLink'
import HeaderSnapButton from '../components/HeaderSnapButton'
import { BsThreeDots } from 'react-icons/bs'
import ProfilePicture from '../components/ProfilePicture'
import { UserContext } from '../data/UserContext'

export default function Sidebar () {
  const [accountMenuVisible, setAccountMenuVisible] = useState(false)

  // eslint-disable-next-line no-unused-vars
  const { user, setUser } = useContext(UserContext)

  return (
    <header className="sticky top-0 flex flex-col items-end justify-between h-screen max-h-full max-w-[595px] p-3 bg-white">
      {accountMenuVisible ? <div className="absolute inset-0 z-[98]" /> : null}
      <div className="flex flex-col gap-3">
        <IconWrapper icon={<GiTurtleShell />} />
        <nav>
          <HeaderLink icon={<RiHome7Fill />} url ="/#/" text="Home" />
          <HeaderLink icon={<FiBell />} url="/#/notifications"text="Notifications" />
          <HeaderLink icon={<AiOutlineMessage />} url="/#/messages" text="Messages" />
          <HeaderLink icon={<GrLike />} url="/#/likes" text="Likes" />
          <HeaderLink icon={<BiPhotoAlbum />} url="/#/albums" text="Albums" />
          <HeaderLink icon={<FiUser />} url="/#/profile" text="Profile" />
        </nav>
        <HeaderSnapButton icon={<AiOutlinePlus />} />
      </div>
      <div className="relative">
        {accountMenuVisible ? <AccountMenu image={user.profilePicture} username={user.username} setMenuIsVisible={setAccountMenuVisible}/> : null}
        <button className="flex justify-between items-center w-12 h-12 rounded-full lg:w-64 bg-white hover:brightness-95" onClick={() => setAccountMenuVisible(true)}>
          <div className="flex items-center">
            <ProfilePicture url={user.profilePicture} size="small" />
            <span className="hidden text-lg mx-3 lg:flex">{user.username}</span>
          </div>
          <div className="hidden justify-center items-center lg:flex">
            <BsThreeDots className="mr-5"/>
          </div>
        </button>
      </div>
    </header>
  )
}
