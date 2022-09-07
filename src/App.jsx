import './style/index.css'
import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Main } from './pages/Main'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Private } from './pages/Private'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { QueryClient, QueryClientProvider } from 'react-query'

const App = () => {
  const queryClient = new QueryClient()

  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <HashRouter basename="/" >
              <Routes>
                <Route path="*" element={
                <Private>
                  <Main />
                </Private>
                } />
                <Route path="/login" element={<Login />}/>
                <Route path="signup" element={<Signup />}/>
              </Routes>
            </HashRouter>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App
