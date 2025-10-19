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
import { useTranslation } from 'react-i18next'
import MonitoringCardSkeleton from './MonitoringCardSkeleton'

/**
 * Get status configuration (color, icon, label)
 */
const getStatusConfig = (status, t) => {
  const configs = {
    healthy: {
      color: 'success',
      icon: <HealthyIcon />,
      label: t('monitoring.status.healthy'),
      bgcolor: 'success.lighter'
    },
    degraded: {
      color: 'warning',
      icon: <DegradedIcon />,
      label: t('monitoring.status.degraded'),
      bgcolor: 'warning.lighter'
    },
    down: {
      color: 'error',
      icon: <ErrorIcon />,
      label: t('monitoring.status.down'),
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
function MonitoringCard({ healthData, loading, isPolling, onRefresh, stats }) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  
  if (loading && !healthData) {
    return <MonitoringCardSkeleton />
  }

  const statusConfig = healthData 
    ? getStatusConfig(healthData.overall_status, t)
    : getStatusConfig('down', t)

  const services = healthData?.services || {}
  const servicesArray = Object.values(services)
  const healthyCount = servicesArray.filter(s => s.status === 'healthy').length
  const degradedCount = servicesArray.filter(s => s.status === 'degraded').length
  const downCount = servicesArray.filter(s => s.status === 'down').length
  const totalCount = servicesArray.length
  
  // Get degraded and down services for preview
  const degradedServices = servicesArray.filter(s => s.status === 'degraded')
  const downServices = servicesArray.filter(s => s.status === 'down')
  
  // Also check applications status
  const applications = healthData?.applications || []
  const degradedApps = applications.filter(app => app.status === 'degraded')
  const downApps = applications.filter(app => app.status === 'down' || app.status === 'unreachable')
  
  // Combine services and applications issues
  const allDegraded = [...degradedServices, ...degradedApps]
  const allDown = [...downServices, ...downApps]

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
              {t('monitoring.card.updating')}
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
                {t('monitoring.card.systemHealth')}
              </Typography>
              <Chip 
                label={statusConfig.label}
                color={statusConfig.color}
                size="small"
                sx={{ mt: 0.5 }}
              />
            </Box>
          </Box>
          
          <Tooltip title={t('monitoring.refresh')}>
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
                {t('monitoring.card.servicesStatus')}
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

          {/* Applications Health Summary */}
          {applications.length > 0 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" color="text.secondary">
                  {t('monitoring.card.appsMonitored')}
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {applications.filter(app => app.status === 'healthy').length}/{applications.length}
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={applications.length > 0 ? (applications.filter(app => app.status === 'healthy').length / applications.length) * 100 : 0}
                color={applications.filter(app => app.status === 'healthy').length === applications.length ? 'success' : 'warning'}
                sx={{ height: 6, borderRadius: 3 }}
              />
            </Box>
          )}

          {/* Issues Preview - Clean Modern Style */}
          {(allDegraded.length > 0 || allDown.length > 0) && (
            <Stack spacing={1} sx={{ mt: 1 }}>
              {allDegraded.map((item, idx) => (
                <Box 
                  key={`degraded-${idx}`}
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    px: 2,
                    py: 1.5,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    border: '2px solid',
                    borderColor: 'warning.main',
                    borderLeft: '4px solid',
                    borderLeftColor: 'warning.main',
                    transition: 'all 0.2s',
                    '&:hover': {
                      boxShadow: 2,
                      transform: 'translateX(4px)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: 'warning.lighter',
                      flexShrink: 0
                    }}
                  >
                    <DegradedIcon sx={{ fontSize: 18, color: 'warning.main' }} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" fontWeight={600} sx={{ mb: 0.25 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      {item.url}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                      {item.status_code && (
                        <Chip 
                          label={`HTTP ${item.status_code}`}
                          size="small"
                          color="warning"
                          sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                      )}
                      {item.response_time && (
                        <Chip 
                          label={`${Math.round(item.response_time)}ms`}
                          size="small"
                          variant="outlined"
                          sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
              ))}
              {allDown.map((item, idx) => (
                <Box 
                  key={`down-${idx}`}
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    px: 2,
                    py: 1.5,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    border: '2px solid',
                    borderColor: 'error.main',
                    borderLeft: '4px solid',
                    borderLeftColor: 'error.main',
                    transition: 'all 0.2s',
                    '&:hover': {
                      boxShadow: 2,
                      transform: 'translateX(4px)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: 'error.lighter',
                      flexShrink: 0
                    }}
                  >
                    <ErrorIcon sx={{ fontSize: 18, color: 'error.main' }} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" fontWeight={600} sx={{ mb: 0.25 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      {item.url}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                      {item.status_code && (
                        <Chip 
                          label={`HTTP ${item.status_code}`}
                          size="small"
                          color="error"
                          sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                      )}
                      {item.message && (
                        <Chip 
                          label={item.message}
                          size="small"
                          variant="outlined"
                          color="error"
                          sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Stack>
          )}

          {/* Key Metrics */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1 }}>
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                {t('monitoring.card.uptime')}
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {formatUptime(healthData?.uptime)}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" color="text.secondary" display="block">
                {t('monitoring.card.lastCheck')}
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
