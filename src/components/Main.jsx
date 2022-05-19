import React from 'react'
import SearchBar from './SearchBar'
import Home from './Home'

export default function Main () {
  return (
    <main className="w-[417px] bg-white xl:w-1/2">
      <section className="flex justify-center items-center gap-3 h-14 w-full">
        <SearchBar />
      </section>
      <Home />
    </main>
  )
}
