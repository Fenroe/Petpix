import './style/index.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Main } from './pages/Main'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Private } from './pages/Private'
import { AuthProvider } from './contexts/AuthContext'

const App = () => {
  return (
    <div className="app">
      <AuthProvider>
        <BrowserRouter basename={process.env.PUBLIC_URL} >
          <Routes>
            <Route path="*" element={
            <Private>
              <Main />
            </Private>
            } />
            <Route path="/login" element={<Login />}/>
            <Route path="signup" element={<Signup />}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
