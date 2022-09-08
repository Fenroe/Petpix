import './style/index.css'
import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Main } from './pages/Main'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Auth } from './pages/Auth'
import { Unauth } from './pages/Unauth'
import { ThemeProvider } from './contexts/ThemeContext'

const App = () => {
  return (
    <div className="app">
      <ThemeProvider>
        <HashRouter basename="/" >
          <Routes>
            <Route path="*" element={
            <Auth>
              <Main />
            </Auth>
            } />
            <Route path="/login" element={
            <Unauth>
              <Login />
            </Unauth>
            }/>
            <Route path="signup" element={
            <Unauth>
              <Signup />
            </Unauth>
            }/>
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </div>
  )
}

export default App
