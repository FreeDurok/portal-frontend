import { useState, useEffect } from 'react'
import { applicationsAPI } from '../api/applications'
import { usersApi } from '../api/users'

/**
 * Custom hook per gestire le statistiche della dashboard
 * Carica e calcola le metriche delle applicazioni e degli utenti
 */
export function useDashboardStats() {
  const [stats, setStats] = useState({
    totalApps: 0,
    activeApps: 0,
    totalUsers: 0,
    loading: true,
    error: null
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      setStats(prev => ({ ...prev, loading: true, error: null }))
      
      const [apps, users] = await Promise.all([
        applicationsAPI.getAll(),
        usersApi.getAll().catch(() => []) // Fallback to empty array if users API fails
      ])
      
      setStats({
        totalApps: apps.length,
        activeApps: apps.filter(app => app.is_active).length,
        totalUsers: users.length,
        loading: false,
        error: null
      })
    } catch (err) {
      console.error('Error loading dashboard stats:', err)
      setStats(prev => ({
        ...prev,
        loading: false,
        error: 'Errore nel caricamento delle statistiche'
      }))
    }
  }

  const refreshStats = () => {
    loadStats()
  }

  return {
    stats,
    refreshStats
  }
}
