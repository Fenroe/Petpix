import './style/index.css'
import React from 'react'
import Sidebar from './components/Sidebar'
import Main from './components/Main'

function App () {
  return (
    <div className="flex justify-center bg-red-400">
      <Sidebar />
      <Main />
    </div>
  )
}

export default App
