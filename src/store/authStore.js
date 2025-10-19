import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      
      login: (token, user) => {
        set({ token, user, isAuthenticated: true })
      },
      
      logout: () => {
        set({ token: null, user: null, isAuthenticated: false })
      },
      
      updateUser: (user) => {
        set((state) => ({ ...state, user }))
      },
      
      // Set token temporarily without marking as authenticated
      setTempToken: (token) => {
        set({ token, user: null, isAuthenticated: false })
      },
    }),
    {
      name: 'auth-storage', // unique name for localStorage key
    }
  )
)

export default useAuthStore
