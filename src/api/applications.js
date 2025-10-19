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

  uploadIcon: async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await axios.post('/applications/upload-icon', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  getIconUrl: (filename) => {
    if (!filename) return null
    return `${axios.defaults.baseURL}/applications/icons/${filename}`
  },
}
