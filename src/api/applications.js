import axios from './axios'

export const applicationsAPI = {
  getAll: async () => {
    const response = await axios.get('/applications')
    return response.data
  },

  getById: async (id) => {
    const response = await axios.get(`/applications/${id}`)
    return response.data
  },

  create: async (data) => {
    const response = await axios.post('/applications', data)
    return response.data
  },

  update: async (id, data) => {
    const response = await axios.put(`/applications/${id}`, data)
    return response.data
  },

  delete: async (id) => {
    const response = await axios.delete(`/applications/${id}`)
    return response.data
  },
}
