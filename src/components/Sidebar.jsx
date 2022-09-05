import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { GiTurtleShell } from 'react-icons/gi'
import { RiHome7Fill } from 'react-icons/ri'
import { FiUser } from 'react-icons/fi'
import { AiOutlinePlus, AiOutlineLike as GrLike } from 'react-icons/ai'
import { BiPhotoAlbum } from 'react-icons/bi'
import { IconWrapper } from './IconWrapper'
import { AccountMenu } from './AccountsMenu'
import { HeaderLink } from './HeaderLink'
import { HeaderSnapButton } from './HeaderSnapButton'
import { BsThreeDots } from 'react-icons/bs'
import { ProfilePicture } from './ProfilePicture'
import { UserContext } from '../contexts/UserContext'
import { SidebarSnapModal } from './SidebarSnapModal'

export const Sidebar = () => {
  const [accountMenuVisible, setAccountMenuVisible] = useState(false)

  const [snapModalVisible, setSnapModalVisible] = useState(false)

  const openSnapModal = () => {
    setSnapModalVisible(true)
  }

  const closeSnapModal = () => {
    setSnapModalVisible(false)
  }

  const { user } = useContext(UserContext)

  return (
    <header className="sidebar-wrapper">
      <div className="y-wrapper sidebar">
        <div className="y-wrapper">
          <Link to="/">
            <IconWrapper icon={<GiTurtleShell />} />
          </Link>
          <nav>
            <HeaderLink icon={<RiHome7Fill />} url ="/" text="Home" />
            <HeaderLink icon={<GrLike />} url="/likes" text="Likes" />
            <HeaderLink icon={<BiPhotoAlbum />} url="/albums" text="Albums" />
            <HeaderLink icon={<FiUser />} url={`/profile/${user.userId}`} text="Profile" />
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
