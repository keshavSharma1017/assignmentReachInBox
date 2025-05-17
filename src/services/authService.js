import axios from 'axios'

const BASE_URL = 'https://hiring.reachinbox.xyz/api/v1'

export const login = async () => {
  const frontendUrl = window.location.origin
  window.location.href = `${BASE_URL}/auth/google-login?redirect_to=${frontendUrl}`
}

export const handleAuthCallback = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('token')
  
  if (token) {
    localStorage.setItem('token', token)
    return true
  }
  return false
}

export const checkAuthStatus = () => {
  const token = localStorage.getItem('token')
  return !!token
}

export const getAuthToken = () => {
  return localStorage.getItem('token')
}

export const logout = () => {
  localStorage.removeItem('token')
}