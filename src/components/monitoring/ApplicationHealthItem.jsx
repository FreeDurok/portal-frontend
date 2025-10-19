import {
  Box,
  Typography,
  Stack,
  Chip,
  Avatar
} from '@mui/material'
import {
  CheckCircle as HealthyIcon,
  Warning as DegradedIcon,
  Error as ErrorIcon,
  HelpOutline as UnknownIcon
} from '@mui/icons-material'

/**
 * Get status configuration for applications
 */
const getAppStatusConfig = (status) => {
  const configs = {
    healthy: {
      color: 'success',
      icon: <HealthyIcon sx={{ fontSize: 16 }} />,
      label: 'Online'
    },
    degraded: {
      color: 'warning',
      icon: <DegradedIcon sx={{ fontSize: 16 }} />,
      label: 'Lento'
    },
    down: {
      color: 'error',
      icon: <ErrorIcon sx={{ fontSize: 16 }} />,
      label: 'Offline'
    },
    unreachable: {
      color: 'error',
      icon: <ErrorIcon sx={{ fontSize: 16 }} />,
      label: 'Irraggiungibile'
    }
  }
  return configs[status] || {
    color: 'default',
    icon: <UnknownIcon sx={{ fontSize: 16 }} />,
    label: 'Sconosciuto'
  }
}

/**
 * Application Health Item - Single application status
 */
function ApplicationHealthItem({ app }) {
  const statusConfig = getAppStatusConfig(app.status)
  const iconUrl = app.icon_file 
    ? `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/uploads/icons/${app.icon_file}`
    : null

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 1.5,
        borderRadius: 2,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.2s',
        '&:hover': {
          borderColor: `${statusConfig.color}.main`,
          boxShadow: 1
        }
      }}
    >
      {/* Left side: Icon + Name */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1, minWidth: 0 }}>
        <Avatar
          src={iconUrl}
          sx={{
            width: 32,
            height: 32,
            bgcolor: `${statusConfig.color}.lighter`,
            color: `${statusConfig.color}.main`,
            fontSize: 16
          }}
        >
          {!iconUrl && app.name.charAt(0)}
        </Avatar>
        
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography 
            variant="body2" 
            fontWeight={600}
            noWrap
            sx={{ mb: 0.25 }}
          >
            {app.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {app.url}
          </Typography>
        </Box>
      </Box>

      {/* Right side: Status indicators */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
        {/* Status Code */}
        {app.status_code && (
          <Chip
            label={app.status_code}
            size="small"
            color={app.status_code === 200 ? 'success' : 'default'}
            sx={{ 
              minWidth: 45,
              height: 24,
              fontSize: '0.75rem',
              fontWeight: 600
            }}
          />
        )}
        
        {/* Response Time */}
        <Box sx={{ textAlign: 'right', minWidth: 60 }}>
          <Typography 
            variant="caption" 
            fontWeight={600}
            sx={{ 
              color: app.response_time < 500 ? 'success.main' : 
                     app.response_time < 1000 ? 'warning.main' : 'error.main'
            }}
          >
            {app.response_time.toFixed(0)} ms
          </Typography>
        </Box>

        {/* Status Icon */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 28,
            height: 28,
            borderRadius: '50%',
            bgcolor: `${statusConfig.color}.lighter`,
            color: `${statusConfig.color}.main`
          }}
        >
          {statusConfig.icon}
        </Box>
      </Box>
    </Box>
  )
}

export default ApplicationHealthItem
