import { useState, useEffect } from 'react'
import { applicationsAPI } from '../api/applications'

/**
 * Custom hook per gestire le statistiche della dashboard
 * Carica e calcola le metriche delle applicazioni
 */
export function useDashboardStats() {
  const [stats, setStats] = useState({
    totalApps: 0,
    activeApps: 0,
    loading: true,
    error: null
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      setStats(prev => ({ ...prev, loading: true, error: null }))
      
      const apps = await applicationsAPI.getAll()
      
      setStats({
        totalApps: apps.length,
        activeApps: apps.filter(app => app.is_active).length,
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
