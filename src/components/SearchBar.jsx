import React from 'react'
import { BiSearch } from 'react-icons/bi'

export default function SearchBar () {
  return (
    <div className="flex items-center text-xl p-3 h-11 w-80 border-2 border-black rounded-full">
      <BiSearch />
      <input className="px-3 focus:outline-none w-full" placeholder="Search Pepe" />
    </div>
  )
}
