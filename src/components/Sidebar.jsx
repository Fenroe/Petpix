import React, { useState } from 'react'
import { GiRabbit } from 'react-icons/gi'
import { RiHome7Fill } from 'react-icons/ri'
import { FiBell, FiUser } from 'react-icons/fi'
import { AiOutlineMessage, AiOutlinePlus } from 'react-icons/ai'
import { GrLike } from 'react-icons/gr'
import { BiPhotoAlbum } from 'react-icons/bi'
import IconWrapper from './IconWrapper'
import profilePicture from '../assets/profile-picture.jpg'
import AccountMenu from './AccountsMenu'
import HeaderLink from './HeaderLink'
import HeaderPostButton from './HeaderPostButton'
import { BsThreeDots } from 'react-icons/bs'

export default function Sidebar () {
  const [accountMenuVisible, setAccountMenuVisible] = useState(false)

  return (
    <header className="flex flex-col items-end justify-between h-screen max-h-full max-w-[595px] p-3">
      {accountMenuVisible ? <AccountMenu image={profilePicture} username="The Rock" setMenuIsVisible={setAccountMenuVisible}/> : null}
      <div className="flex flex-col gap-3">
        <IconWrapper icon={<GiRabbit />} />
        <nav>
          <HeaderLink icon={<RiHome7Fill />} text="Home" />
          <HeaderLink icon={<FiBell />} text="Notifications" />
          <HeaderLink icon={<AiOutlineMessage />} text="Messages" />
          <HeaderLink icon={<GrLike />} text="Likes" />
          <HeaderLink icon={<BiPhotoAlbum />} text="Albums" />
          <HeaderLink icon={<FiUser />} text="Profile" />
        </nav>
        <HeaderPostButton icon={<AiOutlinePlus />} />
      </div>
      <div>
        <button className="flex justify-between items-center w-12 h-12 rounded-full lg:w-64" onClick={() => setAccountMenuVisible(true)}>
          <div className="flex items-center">
            <img className="w-12 h-12 rounded-full"src={profilePicture} />
            <span className="hidden text-lg mx-3 lg:flex">The Rock</span>
          </div>
          <div className="">
            <BsThreeDots />
          </div>
        </button>
      </div>
    </header>
  )
}
