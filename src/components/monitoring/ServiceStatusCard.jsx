import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  Divider
} from '@mui/material'
import {
  CheckCircle as HealthyIcon,
  Warning as DegradedIcon,
  Error as ErrorIcon,
  Speed as SpeedIcon,
  Schedule as TimeIcon
} from '@mui/icons-material'

/**
 * Get status configuration
 */
const getStatusConfig = (status) => {
  const configs = {
    healthy: {
      color: 'success',
      icon: <HealthyIcon sx={{ fontSize: 24 }} />,
      label: 'Operativo',
      bgcolor: 'success.lighter'
    },
    degraded: {
      color: 'warning',
      icon: <DegradedIcon sx={{ fontSize: 24 }} />,
      label: 'Rallentato',
      bgcolor: 'warning.lighter'
    },
    down: {
      color: 'error',
      icon: <ErrorIcon sx={{ fontSize: 24 }} />,
      label: 'Non disponibile',
      bgcolor: 'error.lighter'
    }
  }
  return configs[status] || configs.down
}

/**
 * Format response time with color coding
 */
const getResponseTimeConfig = (responseTime) => {
  if (responseTime < 50) return { color: 'success.main', label: 'Ottimo' }
  if (responseTime < 100) return { color: 'info.main', label: 'Buono' }
  if (responseTime < 200) return { color: 'warning.main', label: 'Accettabile' }
  return { color: 'error.main', label: 'Lento' }
}

/**
 * Service Status Card - Detailed view of a single service
 */
function ServiceStatusCard({ service }) {
  const statusConfig = getStatusConfig(service.status)
  const responseConfig = getResponseTimeConfig(service.response_time)

  return (
    <Card elevation={2}>
      <CardContent>
        {/* Header with Status */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                bgcolor: statusConfig.bgcolor || `${statusConfig.color}.lighter`,
                color: `${statusConfig.color}.main`,
                p: 1.5,
                borderRadius: 2,
                display: 'flex'
              }}
            >
              {statusConfig.icon}
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                {service.name}
              </Typography>
              <Chip 
                label={statusConfig.label}
                color={statusConfig.color}
                size="small"
                sx={{ mt: 0.5 }}
              />
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Service Details */}
        <Stack spacing={2}>
          {/* Response Time */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SpeedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
              <Typography variant="body2" color="text.secondary">
                Tempo di Risposta
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography 
                variant="h6" 
                fontWeight={600}
                sx={{ color: responseConfig.color }}
              >
                {service.response_time.toFixed(2)} ms
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {responseConfig.label}
              </Typography>
            </Box>
          </Box>

          {/* Last Check Time */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TimeIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
              <Typography variant="body2" color="text.secondary">
                Ultimo Controllo
              </Typography>
            </Box>
            <Typography variant="body2" fontWeight={500}>
              {new Date(service.last_check).toLocaleTimeString('it-IT', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </Typography>
          </Box>

          {/* Message */}
          {service.message && (
            <Box
              sx={{
                bgcolor: 'background.default',
                p: 1.5,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Typography 
                variant="caption" 
                color="text.secondary"
                display="block" 
                gutterBottom
              >
                Dettagli
              </Typography>
              <Typography 
                variant="body2"
                color="text.primary"
              >
                {service.message}
              </Typography>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default ServiceStatusCard
