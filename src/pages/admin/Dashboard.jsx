import { Box, Grid, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDashboardStats } from '../../hooks/useDashboardStats'
import StatCard from '../../components/dashboard/StatCard'
import QuickActionCard from '../../components/dashboard/QuickActionCard'
import InfoSection from '../../components/dashboard/InfoSection'
import { statCardsConfig, quickActionsConfig, systemNotes } from '../../config/dashboardConfig.jsx'

/**
 * Dashboard principale dell'admin
 * Visualizza statistiche, azioni rapide e informazioni di sistema
 */
function AdminDashboard() {
  const navigate = useNavigate()
  const { stats } = useDashboardStats()

  const statCards = statCardsConfig(stats, navigate)
  const quickActions = quickActionsConfig(navigate)

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Panoramica e gestione del sistema
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Azioni Rapide
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Accedi rapidamente alle funzionalità principali
        </Typography>
        <Grid container spacing={2}>
          {quickActions.map((action, index) => (
            <Grid item xs={12} md={6} key={index}>
              <QuickActionCard {...action} />
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Info Section */}
      <InfoSection 
        title="Note di Sistema" 
        icon="📋"
        items={systemNotes} 
      />
    </Box>
  )
}

export default AdminDashboard
