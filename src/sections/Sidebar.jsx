import React, { useState, useContext } from 'react'
import { GiTurtleShell } from 'react-icons/gi'
import { RiHome7Fill } from 'react-icons/ri'
import { FiBell, FiUser } from 'react-icons/fi'
import { AiOutlinePlus } from 'react-icons/ai'
import { GrLike } from 'react-icons/gr'
import { BiPhotoAlbum } from 'react-icons/bi'
import IconWrapper from '../components/IconWrapper'
import AccountMenu from '../components/AccountsMenu'
import HeaderLink from '../components/HeaderLink'
import HeaderSnapButton from '../components/HeaderSnapButton'
import { BsThreeDots } from 'react-icons/bs'
import ProfilePicture from '../components/ProfilePicture'
import { UserContext } from '../data/UserContext'
import SidebarSnapModal from '../components/SidebarSnapModal'

export default function Sidebar () {
  const [accountMenuVisible, setAccountMenuVisible] = useState(false)

  const [snapModalVisible, setSnapModalVisible] = useState(false)

  function openSnapModal () {
    setSnapModalVisible(true)
  }
  function closeSnapModal () {
    setSnapModalVisible(false)
  }

  const { user } = useContext(UserContext)

  return (
    <header className="sidebar-wrapper">
      <div className="y-wrapper sidebar">
        <div className="y-wrapper">
          <IconWrapper icon={<GiTurtleShell />} />
          <nav>
            <HeaderLink icon={<RiHome7Fill />} url ="/#/" text="Home" />
            <HeaderLink icon={<FiBell />} url="/#/notifications"text="Notifications" />
            <HeaderLink icon={<GrLike />} url="/#/likes" text="Likes" />
            <HeaderLink icon={<BiPhotoAlbum />} url="/#/albums/myalbums" text="Albums" />
            <HeaderLink icon={<FiUser />} url={`/#/profile/${user.userId}`} text="Profile" />
          </nav>
          <HeaderSnapButton icon={<AiOutlinePlus />} openModal={openSnapModal} />
        </div>
        <div className="sidebar-bot">
          {accountMenuVisible ? <AccountMenu image={user.profilePicture} username={user.username} setMenuIsVisible={setAccountMenuVisible}/> : null}
          <button className="sidebar-account-btn" onClick={() => setAccountMenuVisible(true)}>
            <div className="flex items-center">
              <ProfilePicture url={user.profilePicture} size="small" />
              <span className="sidebar-account-btn-left-span">{user.username}</span>
            </div>
            <div className="three-dots-wrapper">
              <BsThreeDots className="three-dots"/>
            </div>
          </button>
        </div>
      </div>
      {snapModalVisible ? <SidebarSnapModal closeModal={closeSnapModal}/> : null}
    </header>
  )
}
