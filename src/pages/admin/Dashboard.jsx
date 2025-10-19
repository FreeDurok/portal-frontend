import { Box, Grid, Paper, Typography } from '@mui/material'
import { Dashboard as DashboardIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDashboardStats } from '../../hooks/useDashboardStats'
import { useMonitoring } from '../../hooks/useMonitoring'
import StatCard from '../../components/dashboard/StatCard'
import QuickActionCard from '../../components/dashboard/QuickActionCard'
import InfoSection from '../../components/dashboard/InfoSection'
import MonitoringCard from '../../components/monitoring/MonitoringCard'
import { statCardsConfig, quickActionsConfig, systemNotes } from '../../config/dashboardConfig.jsx'

/**
 * Dashboard principale dell'admin
 * Visualizza statistiche, azioni rapide e informazioni di sistema
 */
function AdminDashboard() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { stats } = useDashboardStats()
  const { healthData, loading, isPolling, refetch } = useMonitoring(10000, true)

  const statCards = statCardsConfig(stats, navigate, t)
  const quickActions = quickActionsConfig(navigate, t)

  return (
    <Box>
      {/* Header - Centered */}
      <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
        <Grid item xs={12} lg={8}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <DashboardIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Box>
              <Typography variant="h4" fontWeight={700}>
                {t('dashboard.title')}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                {t('dashboard.subtitle')}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Stats Cards - Centered */}
      <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}>
            {statCards.map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <StatCard {...card} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Monitoring Card - 8 columns width centered */}
      <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
        <Grid item xs={12} lg={8}>
          <MonitoringCard 
            healthData={healthData}
            loading={loading}
            isPolling={isPolling}
            onRefresh={refetch}
            stats={stats}
          />
        </Grid>
      </Grid>

      {/* Quick Actions - 8 columns width centered */}
      <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
        <Grid item xs={12} lg={8}>
          <Paper elevation={0} sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {t('dashboard.quickActions.title')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {t('dashboard.subtitle')}
            </Typography>
            <Grid container spacing={2}>
              {quickActions.map((action, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <QuickActionCard {...action} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* System Information - 8 columns width centered */}
      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        <Grid item xs={12} lg={8}>
          <InfoSection {...systemNotes(t)} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default AdminDashboard
