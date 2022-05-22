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
    <header className="sticky top-0 h-screen max-h-full w-fit overflow-y-scroll bg-white">
      <div className="flex flex-col items-end justify-between gap-3 h-full w-full p-3">
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
        <div className="w-full">
          {accountMenuVisible ? <AccountMenu image={user.profilePicture} username={user.username} setMenuIsVisible={setAccountMenuVisible}/> : null}
          <button className="flex justify-between items-center w-12 h-12 rounded-full lg:w-64 hover:brightness-95" onClick={() => setAccountMenuVisible(true)}>
            <div className="flex items-center">
              <ProfilePicture url={user.profilePicture} size="small" />
              <span className="hidden text-lg mx-3 lg:flex">{user.username}</span>
            </div>
            <div className="hidden justify-center items-center lg:flex">
              <BsThreeDots className="mr-5"/>
            </div>
          </button>
        </div>
      </div>

    </header>
  )
}
