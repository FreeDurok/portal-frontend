import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Grid,
  Stack
} from '@mui/material'
import {
  CheckCircle as HealthyIcon,
  Warning as DegradedIcon,
  Error as ErrorIcon,
  TrendingUp as UptimeIcon,
  Speed as PerformanceIcon,
  Circle as PollingIcon
} from '@mui/icons-material'

/**
 * Get overall status configuration
 */
const getStatusConfig = (status) => {
  const configs = {
    healthy: {
      color: 'success',
      icon: <HealthyIcon sx={{ fontSize: 48 }} />,
      label: 'Tutti i Servizi Operativi',
      description: 'Il sistema funziona correttamente',
      bgcolor: 'success.lighter'
    },
    degraded: {
      color: 'warning',
      icon: <DegradedIcon sx={{ fontSize: 48 }} />,
      label: 'Servizi Rallentati',
      description: 'Alcuni servizi rispondono lentamente',
      bgcolor: 'warning.lighter'
    },
    down: {
      color: 'error',
      icon: <ErrorIcon sx={{ fontSize: 48 }} />,
      label: 'Servizi Non Disponibili',
      description: 'Uno o più servizi non sono raggiungibili',
      bgcolor: 'error.lighter'
    }
  }
  return configs[status] || configs.down
}

/**
 * Format uptime to human readable string
 */
const formatUptime = (seconds) => {
  if (!seconds) return 'N/A'
  
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  
  if (days > 0) return `${days} giorni, ${hours} ore`
  if (hours > 0) return `${hours} ore, ${minutes} minuti`
  if (minutes > 0) return `${minutes} minuti, ${secs} secondi`
  return `${secs} secondi`
}

/**
 * Calculate average response time
 */
const calculateAvgResponseTime = (services) => {
  const servicesArray = Object.values(services)
  if (servicesArray.length === 0) return 0
  
  const total = servicesArray.reduce((sum, service) => sum + service.response_time, 0)
  return total / servicesArray.length
}

/**
 * Overall Health Summary Card
 */
function HealthSummaryCard({ healthData, isPolling }) {
  const statusConfig = getStatusConfig(healthData.overall_status)
  const services = healthData?.services || {}
  const servicesArray = Object.values(services)
  const avgResponseTime = calculateAvgResponseTime(services)

  return (
    <Card 
      elevation={3}
      sx={{
        background: `linear-gradient(135deg, ${statusConfig.bgcolor || `${statusConfig.color}.lighter`} 0%, ${statusConfig.bgcolor || `${statusConfig.color}.light`} 100%)`,
        position: 'relative',
        overflow: 'visible'
      }}
    >
      {/* Polling Indicator */}
      {isPolling && (
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            bgcolor: 'background.paper',
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            boxShadow: 2
          }}
        >
          <PollingIcon 
            sx={{ 
              fontSize: 10, 
              color: 'primary.main',
              animation: 'pulse 2s infinite'
            }} 
          />
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            Aggiornamento in corso...
          </Typography>
        </Box>
      )}

      <CardContent sx={{ p: 4 }}>
        {/* Main Status */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              p: 2,
              borderRadius: 3,
              display: 'flex',
              boxShadow: 2,
              color: `${statusConfig.color}.main`
            }}
          >
            {statusConfig.icon}
          </Box>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              {statusConfig.label}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {statusConfig.description}
            </Typography>
            <Chip 
              label={healthData.overall_status.toUpperCase()}
              color={statusConfig.color}
              size="small"
              sx={{ mt: 1, fontWeight: 600 }}
            />
          </Box>
        </Box>

        {/* Metrics Grid */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Uptime */}
          <Grid item xs={12} md={4}>
            <Card elevation={0} sx={{ bgcolor: 'background.paper', height: '100%' }}>
              <CardContent>
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <UptimeIcon sx={{ color: 'primary.main' }} />
                    <Typography variant="body2" color="text.secondary">
                      Uptime
                    </Typography>
                  </Box>
                  <Typography variant="h5" fontWeight={700}>
                    {formatUptime(healthData.uptime)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Sistema attivo da
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Average Response Time */}
          <Grid item xs={12} md={4}>
            <Card elevation={0} sx={{ bgcolor: 'background.paper', height: '100%' }}>
              <CardContent>
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PerformanceIcon sx={{ color: 'info.main' }} />
                    <Typography variant="body2" color="text.secondary">
                      Tempo Medio
                    </Typography>
                  </Box>
                  <Typography variant="h5" fontWeight={700}>
                    {avgResponseTime.toFixed(2)} ms
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Risposta dei servizi
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Services Status */}
          <Grid item xs={12} md={4}>
            <Card elevation={0} sx={{ bgcolor: 'background.paper', height: '100%' }}>
              <CardContent>
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <HealthyIcon sx={{ color: 'success.main' }} />
                    <Typography variant="body2" color="text.secondary">
                      Servizi
                    </Typography>
                  </Box>
                  <Typography variant="h5" fontWeight={700}>
                    {servicesArray.filter(s => s.status === 'healthy').length}/{servicesArray.length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Operativi
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Last Update Time */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Ultimo aggiornamento: {new Date(healthData.timestamp).toLocaleString('it-IT', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </Typography>
        </Box>
      </CardContent>

      {/* CSS for pulse animation */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
        `}
      </style>
    </Card>
  )
}

export default HealthSummaryCard
