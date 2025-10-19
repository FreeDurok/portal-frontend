import {
  Card,
  CardContent,
  Box,
  Skeleton,
  Stack
} from '@mui/material'

/**
 * Skeleton loader for MonitoringCard
 */
function MonitoringCardSkeleton() {
  return (
    <Card elevation={2}>
      <CardContent>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Box sx={{ flex: 1 }}>
            <Skeleton width="60%" height={28} />
            <Skeleton width="40%" height={20} sx={{ mt: 0.5 }} />
          </Box>
        </Box>

        {/* Service bars */}
        <Stack spacing={2}>
          {[1, 2, 3, 4].map((i) => (
            <Box key={i}>
              <Skeleton width="30%" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="rectangular" height={8} sx={{ borderRadius: 1 }} />
            </Box>
          ))}
        </Stack>

        {/* Issue badges */}
        <Box sx={{ display: 'flex', gap: 1, mt: 3, flexWrap: 'wrap' }}>
          <Skeleton variant="rectangular" width={120} height={32} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={140} height={32} sx={{ borderRadius: 1 }} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default MonitoringCardSkeleton
