import React, { useState } from 'react'
import { GiRabbitHead } from 'react-icons/gi'
import { RiHome7Fill } from 'react-icons/ri'
import { FiBell, FiUser } from 'react-icons/fi'
import { AiOutlineMessage, AiOutlinePlus } from 'react-icons/ai'
import { GrLike } from 'react-icons/gr'
import { BiPhotoAlbum } from 'react-icons/bi'
import IconWrapper from './IconWrapper'
import profilePicture from '../assets/profile-picture.jpg'
import AccountMenu from './AccountsMenu'
import buttonClicked from '../utils/buttonClicked'

export default function Sidebar () {
  const [accountMenuVisible, setAccountMenuVisible] = useState(false)

  return (
    <header className="flex flex-col justify-between h-screen max-h-full w-16 p-3">
      {accountMenuVisible ? <AccountMenu image={profilePicture} username="The Rock" setMenuIsVisible={setAccountMenuVisible}/> : null}
      <div className="flex flex-col gap-3">
        <IconWrapper icon={<GiRabbitHead />} />
        <nav>
          <IconWrapper icon={<RiHome7Fill />} />
          <IconWrapper icon={<FiBell />} />
          <IconWrapper icon={<AiOutlineMessage />} />
          <IconWrapper icon={<GrLike />} />
          <IconWrapper icon={<BiPhotoAlbum />} />
          <IconWrapper icon={<FiUser />} />
        </nav>
        <button className="flex justify-center items-center bg-red-500 w-16 h-16 rounded-full text-4xl text-white" onClick={() => buttonClicked()}>
          <AiOutlinePlus />
        </button>
      </div>
      <div>
        <button className="flex justify-content items-center w-12 h-12 rounded-full" onClick={() => setAccountMenuVisible(true)}>
          <img className="w-full h-full rounded-full"src={profilePicture} />
        </button>
      </div>
    </header>
  )
}
