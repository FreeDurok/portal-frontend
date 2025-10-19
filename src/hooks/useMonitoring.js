import { useState, useEffect, useRef } from 'react'
import { getHealthStatus } from '../api/monitoring'

/**
 * Custom hook for monitoring health status with automatic polling
 * @param {number} interval - Polling interval in milliseconds (default: 10000)
 * @param {boolean} enabled - Whether polling is enabled (default: true)
 */
export const useMonitoring = (interval = 10000, enabled = true) => {
  const [healthData, setHealthData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isPolling, setIsPolling] = useState(false)
  const intervalRef = useRef(null)
  const mountedRef = useRef(true)

  const fetchHealthStatus = async (isInitialLoad = false) => {
    if (!mountedRef.current) return
    
    try {
      if (isInitialLoad) {
        setLoading(true)
      } else {
        setIsPolling(true)
      }
      
      const data = await getHealthStatus()
      
      if (mountedRef.current) {
        setHealthData(data)
        setError(null)
      }
    } catch (err) {
      if (mountedRef.current) {
        console.error('Error fetching health status:', err)
        setError(err.response?.data?.detail || 'Failed to fetch monitoring data')
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false)
        setIsPolling(false)
      }
    }
  }

  useEffect(() => {
    mountedRef.current = true

    if (!enabled) {
      setLoading(false)
      return
    }

    // Initial fetch
    fetchHealthStatus(true)

    // Setup polling
    if (interval > 0) {
      intervalRef.current = setInterval(() => {
        fetchHealthStatus(false)
      }, interval)
    }

    // Cleanup
    return () => {
      mountedRef.current = false
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [interval, enabled])

  const refetch = () => {
    fetchHealthStatus(false)
  }

  return {
    healthData,
    loading,
    error,
    isPolling,
    refetch
  }
}

export default useMonitoring
