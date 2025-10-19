import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
  Divider
} from '@mui/material'
import {
  Apps as AppsIcon,
  CheckCircle as HealthyIcon,
  Error as ErrorIcon
} from '@mui/icons-material'
import ApplicationHealthItem from './ApplicationHealthItem'

/**
 * Applications Health Card - Shows status of all monitored applications
 */
function ApplicationsHealthCard({ applications }) {
  if (!applications || applications.length === 0) {
    return (
      <Card elevation={2}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box
              sx={{
                bgcolor: 'info.lighter',
                color: 'info.main',
                p: 1.5,
                borderRadius: 2,
                display: 'flex'
              }}
            >
              <AppsIcon sx={{ fontSize: 24 }} />
            </Box>
            <Typography variant="h6" fontWeight={600}>
              Applicazioni
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Nessuna applicazione da monitorare
          </Typography>
        </CardContent>
      </Card>
    )
  }

  const healthyCount = applications.filter(app => app.status === 'healthy').length
  const degradedCount = applications.filter(app => app.status === 'degraded').length
  const downCount = applications.filter(app => app.status === 'down' || app.status === 'unreachable').length
  const totalCount = applications.length

  const overallHealthy = downCount === 0 && degradedCount === 0

  return (
    <Card elevation={2}>
      <CardContent>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                bgcolor: overallHealthy ? 'success.lighter' : 'warning.lighter',
                color: overallHealthy ? 'success.main' : 'warning.main',
                p: 1.5,
                borderRadius: 2,
                display: 'flex'
              }}
            >
              {overallHealthy ? (
                <HealthyIcon sx={{ fontSize: 24 }} />
              ) : (
                <ErrorIcon sx={{ fontSize: 24 }} />
              )}
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Applicazioni
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {totalCount} applicazioni monitorate
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Statistics */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Chip
            icon={<HealthyIcon sx={{ fontSize: 16 }} />}
            label={`${healthyCount} Online`}
            color="success"
            size="small"
            variant="outlined"
          />
          {degradedCount > 0 && (
            <Chip
              label={`${degradedCount} Lenti`}
              color="warning"
              size="small"
              variant="outlined"
            />
          )}
          {downCount > 0 && (
            <Chip
              label={`${downCount} Offline`}
              color="error"
              size="small"
              variant="outlined"
            />
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Applications List */}
        <Stack spacing={1}>
          {applications.map((app) => (
            <ApplicationHealthItem key={app.id} app={app} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default ApplicationsHealthCard
