import React, { useState } from 'react'
import { GiRabbit } from 'react-icons/gi'
import { RiHome7Fill } from 'react-icons/ri'
import { FiBell, FiUser } from 'react-icons/fi'
import { AiOutlineMessage, AiOutlinePlus } from 'react-icons/ai'
import { GrLike } from 'react-icons/gr'
import { BiPhotoAlbum } from 'react-icons/bi'
import IconWrapper from './IconWrapper'
import exampleProfilePicture from '../assets/profilePictures/the-rock.jpg'
import AccountMenu from './AccountsMenu'
import HeaderLink from './HeaderLink'
import HeaderPostButton from './HeaderPostButton'
import { BsThreeDots } from 'react-icons/bs'
import ProfilePicture from './ProfilePicture'

export default function Sidebar () {
  const [accountMenuVisible, setAccountMenuVisible] = useState(false)

  return (
    <header className="sticky flex flex-col items-end justify-between h-screen max-h-full max-w-[595px] p-3 bg-white">
      {accountMenuVisible ? <div className="absolute inset-0 z-[98]" /> : null}
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
      <div className="relative">
        {accountMenuVisible ? <AccountMenu image={exampleProfilePicture} username="The Rock" setMenuIsVisible={setAccountMenuVisible}/> : null}
        <button className="flex justify-between items-center w-12 h-12 rounded-full lg:w-64 bg-white hover:brightness-95" onClick={() => setAccountMenuVisible(true)}>
          <div className="flex items-center">
            <ProfilePicture url={exampleProfilePicture} />
            <span className="hidden text-lg mx-3 lg:flex">The Rock</span>
          </div>
          <div className="hidden justify-center items-center lg:flex">
            <BsThreeDots className="mr-5"/>
          </div>
        </button>
      </div>
    </header>
  )
}
