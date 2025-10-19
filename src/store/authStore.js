import { create } from 'zustand'

// Simple localStorage persistence
const getStoredAuth = () => {
  try {
    const stored = localStorage.getItem('auth-storage')
    return stored ? JSON.parse(stored) : { token: null, user: null, isAuthenticated: false }
  } catch {
    return { token: null, user: null, isAuthenticated: false }
  }
}

const setStoredAuth = (state) => {
  try {
    localStorage.setItem('auth-storage', JSON.stringify(state))
  } catch (error) {
    console.error('Failed to save auth state:', error)
  }
}

const useAuthStore = create((set) => ({
  ...getStoredAuth(),
  
  login: (token, user) => {
    const newState = { token, user, isAuthenticated: true }
    set(newState)
    setStoredAuth(newState)
  },
  
  logout: () => {
    const newState = { token: null, user: null, isAuthenticated: false }
    set(newState)
    setStoredAuth(newState)
  },
  
  updateUser: (user) => {
    set((state) => {
      const newState = { ...state, user }
      setStoredAuth(newState)
      return newState
    })
  },
}))

export default useAuthStore
