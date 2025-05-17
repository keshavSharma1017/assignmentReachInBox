import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext.jsx'
import { useTheme } from './contexts/ThemeContext.jsx'
import LoginPage from './pages/LoginPage.jsx'
import OneboxPage from './pages/OneboxPage.jsx'
import './styles/App.css'

function App() {
  const { user } = useAuth()
  const { theme } = useTheme()
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={user ? <Navigate to="/onebox" /> : <LoginPage />} />
        <Route path="/onebox" element={user ? <OneboxPage /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to={user ? "/onebox" : "/"} />} />
      </Routes>
    </div>
  )
}

export default App