import React from 'react'
import { ImLocation2 } from 'react-icons/im'
import { BsCalendar3 } from 'react-icons/bs'

export default function ProfilePage () {
  return (
    <section className="w-full flex flex-col items-center px-3">
      <div className="w-full h-52 bg-slate-500"></div>
      <div className="w-full h-16 flex space-between"></div>
      <div className="w-full my-3">
        <h1>Name</h1>
      </div>
      <div className="w-full my-3">
        <p>bio</p>
      </div>
      <div className="w-full flex gap-3">
        <div className="flex items-center gap-1">
          <ImLocation2 />
          <span>location</span>
        </div>
        <div className="flex items-center gap-1">
          <BsCalendar3 />
          <span>joined yesterday</span>
        </div>
      </div>
    </section>
  )
}
