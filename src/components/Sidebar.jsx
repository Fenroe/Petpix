import React from 'react'
import { GiRabbitHead } from 'react-icons/gi'
import { RiHome7Fill } from 'react-icons/ri'
import { FiBell, FiUser } from 'react-icons/fi'
import { AiOutlineMessage, AiOutlinePlus } from 'react-icons/ai'
import { GrLike } from 'react-icons/gr'
import { BiPhotoAlbum } from 'react-icons/bi'

export default function Sidebar () {
  return (
    <header className="h-screen w-16 p-3">
      <div className="flex justify-center items-center h-14 w-14"><GiRabbitHead className="text-3xl text-red-500" /></div>
      <nav className="text-3xl">
        <div className="flex justify-center items-center h-14 w-14 hover:cursor-pointer">
          <RiHome7Fill />
        </div>
        <div className="flex justify-center items-center h-14 w-14">
          <FiBell />
        </div>
        <div className="flex justify-center items-center h-14 w-14">
          <AiOutlineMessage />
        </div>
        <div className="flex justify-center items-center h-14 w-14">
          <GrLike />
        </div>
        <div className="flex justify-center items-center h-14 w-14">
          <BiPhotoAlbum />
        </div>
        <div className="flex justify-center items-center h-14 w-14">
          <FiUser />
        </div>
      </nav>
      <div className="flex justify-center items-center h-14 w-14">
        <AiOutlinePlus className="text-3xl" />
      </div>
    </header>
  )
}
