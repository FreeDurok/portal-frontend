import {
  Box,
  Typography,
  Grid,
  Alert,
  Button,
  Paper,
  CircularProgress,
  Stack
} from '@mui/material'
import { Refresh as RefreshIcon, MonitorHeart } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useMonitoring } from '../../hooks/useMonitoring'
import HealthSummaryCard from '../../components/monitoring/HealthSummaryCard'
import ServiceStatusCard from '../../components/monitoring/ServiceStatusCard'
import ApplicationsHealthCard from '../../components/monitoring/ApplicationsHealthCard'

function Monitoring() {
  const { t } = useTranslation()
  const { healthData, loading, error, isPolling, refetch } = useMonitoring(10000, true)

  // Loading state with skeleton
  if (loading && !healthData) {
    return (
      <Box>
        <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
          <Grid item xs={12} lg={8}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
              <MonitorHeart sx={{ fontSize: 40, color: 'primary.main' }} />
              <Box>
                <Typography variant="h4" fontWeight={700}>
                  {t('monitoring.title')}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                  {t('monitoring.subtitle')}
                </Typography>
              </Box>
            </Box>

            <Stack spacing={3}>
              {/* Skeleton for HealthSummaryCard */}
              <Paper elevation={2} sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <CircularProgress size={24} />
                  <Typography>{t('common.loading')}</Typography>
                </Box>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    )
  }

  // Error state
  if (error && !healthData) {
    return (
      <Box>
        <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
          <Grid item xs={12} lg={8}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
              <MonitorHeart sx={{ fontSize: 40, color: 'primary.main' }} />
              <Box>
                <Typography variant="h4" fontWeight={700}>
                  {t('monitoring.title')}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                  {t('monitoring.subtitle')}
                </Typography>
              </Box>
            </Box>

            <Alert 
              severity="error"
              action={
                <Button color="inherit" size="small" onClick={refetch}>
                  {t('monitoring.refresh')}
                </Button>
              }
            >
              {error}
            </Alert>
          </Grid>
        </Grid>
      </Box>
    )
  }

  const services = healthData?.services || {}
  const servicesArray = Object.entries(services)

  return (
    <Box>
      {/* Header - Centered */}
      <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
        <Grid item xs={12} lg={8}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <MonitorHeart sx={{ fontSize: 40, color: 'primary.main' }} />
              <Box>
                <Typography variant="h4" fontWeight={700}>
                  {t('monitoring.title')}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                  {t('monitoring.subtitle')}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={refetch}
              disabled={isPolling}
            >
              {t('monitoring.refresh')}
            </Button>
          </Box>

          {/* Error Alert (if error but we still have cached data) */}
          {error && healthData && (
            <Alert severity="warning" sx={{ mt: 3 }}>
              Errore durante l'aggiornamento: {error}. Visualizzazione ultimi dati disponibili.
            </Alert>
          )}
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        <Grid item xs={12} lg={8}>
          <Stack spacing={3}>
            {/* Overall Health Summary */}
            <HealthSummaryCard healthData={healthData} isPolling={isPolling} />

            {/* Applications Health */}
            {healthData?.applications && healthData.applications.length > 0 && (
              <Box>
                <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
                  {t('monitoring.monitoringPage.applicationStatus')}
                </Typography>
                <ApplicationsHealthCard applications={healthData.applications} />
              </Box>
            )}

            {/* Services Grid */}
            <Box>
              <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
                {t('monitoring.monitoringPage.serviceDetails')}
              </Typography>
              <Grid container spacing={3}>
                {servicesArray.map(([key, service]) => (
                  <Grid item xs={12} md={6} key={key}>
                    <ServiceStatusCard service={service} />
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Info Note */}
            <Alert severity="info">
              <strong>{t('monitoring.monitoringPage.note')}:</strong> {t('monitoring.monitoringPage.autoUpdateNote')}
            </Alert>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Monitoring
