import './style/index.css'
import React from 'react'
import Sidebar from './components/Sidebar'
import Main from './components/Main'

function App () {
  return (
    <div className="flex justify-center">
      <Sidebar />
      <Main />
    </div>
  )
}

export default App
