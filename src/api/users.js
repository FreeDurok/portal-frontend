import api from './axios'

export const usersApi = {
  // Get all users
  getAll: async () => {
    const response = await api.get('/users/')
    return response.data
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/users/me')
    return response.data
  },

  // Create user
  create: async (userData) => {
    const response = await api.post('/users/', userData)
    return response.data
  },

  // Update user
  update: async (userId, userData) => {
    const response = await api.put(`/users/${userId}`, userData)
    return response.data
  },

  // Delete user
  delete: async (userId) => {
    const response = await api.delete(`/users/${userId}`)
    return response.data
  },
}

export default usersApi
