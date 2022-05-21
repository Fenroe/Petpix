import './style/index.css'
import React from 'react'
import Sidebar from './sections/Sidebar'
import Main from './sections/Main'

function App () {
  // const [userInfo, setUserInfo] = useState({})

  return (
    <div className="flex justify-center bg-red-400">
      <Sidebar />
      <Main />
    </div>
  )
}

export default App
