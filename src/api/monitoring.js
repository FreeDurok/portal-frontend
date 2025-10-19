import axios from './axios'

/**
 * API calls for monitoring services
 */

/**
 * Get system health status
 * @returns {Promise} Health check data
 */
export const getHealthStatus = async () => {
  const response = await axios.get('/public/health')
  return response.data
}

export default {
  getHealthStatus
}
