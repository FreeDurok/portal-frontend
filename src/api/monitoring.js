import axios from './axios'

/**
 * API calls for monitoring services
 */

/**
 * Get system health status
 * @returns {Promise} Health check data
 */
export const getHealthStatus = async () => {
  const response = await axios.get('/public/health', {
    timeout: 8000 // 8 seconds max wait time (backend timeout is 2s per app)
  })
  return response.data
}

export default {
  getHealthStatus
}
