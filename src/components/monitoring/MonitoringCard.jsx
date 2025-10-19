import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  Stack,
  IconButton,
  Tooltip
} from '@mui/material'
import {
  CheckCircle as HealthyIcon,
  Warning as DegradedIcon,
  Error as ErrorIcon,
  Refresh as RefreshIcon,
  Circle as PollingIcon
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

/**
 * Get status configuration (color, icon, label)
 */
const getStatusConfig = (status) => {
  const configs = {
    healthy: {
      color: 'success',
      icon: <HealthyIcon />,
      label: 'Operativo',
      bgcolor: 'success.lighter'
    },
    degraded: {
      color: 'warning',
      icon: <DegradedIcon />,
      label: 'Rallentato',
      bgcolor: 'warning.lighter'
    },
    down: {
      color: 'error',
      icon: <ErrorIcon />,
      label: 'Non disponibile',
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
  
  if (days > 0) return `${days}g ${hours}h`
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

/**
 * Monitoring Card Component for Dashboard
 */
function MonitoringCard({ healthData, loading, isPolling, onRefresh }) {
  const navigate = useNavigate()
  
  if (loading && !healthData) {
    return (
      <Card 
        sx={{ 
          cursor: 'pointer'
        }}
        onClick={() => navigate('/admin/monitoring')}
      >
        <CardContent>
          <LinearProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Caricamento...
          </Typography>
        </CardContent>
      </Card>
    )
  }

  const statusConfig = healthData 
    ? getStatusConfig(healthData.overall_status)
    : getStatusConfig('down')

  const services = healthData?.services || {}
  const servicesArray = Object.values(services)
  const healthyCount = servicesArray.filter(s => s.status === 'healthy').length
  const totalCount = servicesArray.length

  return (
    <Card 
      sx={{ 
        cursor: 'pointer',
        position: 'relative'
      }}
      onClick={() => navigate('/admin/monitoring')}
    >
      <CardContent>
        {/* Polling Indicator */}
        {isPolling && (
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}
          >
            <PollingIcon 
              sx={{ 
                fontSize: 10, 
                color: 'primary.main',
                animation: 'pulse 2s infinite'
              }} 
            />
            <Typography variant="caption" color="text.secondary">
              Aggiornamento...
            </Typography>
          </Box>
        )}

        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                bgcolor: statusConfig.bgcolor || `${statusConfig.color}.lighter`,
                color: `${statusConfig.color}.main`,
                p: 1,
                borderRadius: 2,
                display: 'flex'
              }}
            >
              {statusConfig.icon}
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                System Health
              </Typography>
              <Chip 
                label={statusConfig.label}
                color={statusConfig.color}
                size="small"
                sx={{ mt: 0.5 }}
              />
            </Box>
          </Box>
          
          <Tooltip title="Aggiorna">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                onRefresh()
              }}
              sx={{ 
                opacity: 0.6,
                '&:hover': { opacity: 1 }
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Services Status */}
        <Stack spacing={1.5}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                Servizi Operativi
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {healthyCount}/{totalCount}
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={(healthyCount / totalCount) * 100}
              color={healthyCount === totalCount ? 'success' : 'warning'}
              sx={{ height: 6, borderRadius: 3 }}
            />
          </Box>

          {/* Applications Summary */}
          {healthData?.applications && healthData.applications.length > 0 && (
            <Box sx={{ pt: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" color="text.secondary">
                  Applicazioni
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {healthData.applications.filter(app => app.status === 'healthy').length}/{healthData.applications.length} online
                </Typography>
              </Box>
            </Box>
          )}

          {/* Key Metrics */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1 }}>
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                Uptime
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {formatUptime(healthData?.uptime)}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" color="text.secondary" display="block">
                Ultimo Check
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {healthData?.timestamp 
                  ? new Date(healthData.timestamp).toLocaleTimeString('it-IT', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })
                  : 'N/A'
                }
              </Typography>
            </Box>
          </Box>
        </Stack>
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

export default MonitoringCard
