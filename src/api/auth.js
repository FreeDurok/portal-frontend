import axios from './axios'

export const authAPI = {
  login: async (username, password) => {
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    
    const response = await axios.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  register: async (email, username, password) => {
    const response = await axios.post('/auth/register', {
      email,
      username,
      password,
    })
    return response.data
  },

  getCurrentUser: async () => {
    const response = await axios.get('/users/me')
    return response.data
  },
}
