import React from 'react'
import { GiRabbitHead } from 'react-icons/gi'
import { RiHome7Fill } from 'react-icons/ri'
import { FiBell, FiUser } from 'react-icons/fi'
import { AiOutlineMessage, AiOutlinePlus } from 'react-icons/ai'
import { GrLike } from 'react-icons/gr'
import { BiPhotoAlbum } from 'react-icons/bi'
import IconWrapper from './IconWrapper'

export default function Sidebar () {
  return (
    <header className="flex justify-between h-screen w-16 p-3">
      <div className="">
        <IconWrapper icon={<GiRabbitHead />} />
        <nav>
          <IconWrapper icon={<RiHome7Fill />} />
          <IconWrapper icon={<FiBell />} />
          <IconWrapper icon={<AiOutlineMessage />} />
          <IconWrapper icon={<GrLike />} />
          <IconWrapper icon={<BiPhotoAlbum />} />
          <IconWrapper icon={<FiUser />} />
        </nav>
        <IconWrapper icon={<AiOutlinePlus />} />
      </div>
      <div className=""></div>
    </header>
  )
}
