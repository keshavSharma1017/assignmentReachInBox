import { createContext, useContext, useState, useEffect } from 'react'
import { login as apiLogin, logout as apiLogout } from '../services/authService.js'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ token })
    }
    setLoading(false)
  }, [])

  const login = async () => {
    try {
      setLoading(true)
      const frontendUrl = window.location.origin
      window.location.href = `https://hiring.reachinbox.xyz/api/v1/auth/google-login?redirect_to=${frontendUrl}`
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    apiLogout()
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider