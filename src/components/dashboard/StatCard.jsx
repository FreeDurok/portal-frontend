import {
  Card,
  CardContent,
  CardActionArea,
  Box,
  Typography
} from '@mui/material'

/**
 * Card per visualizzare una statistica con icona
 * Può essere cliccabile o disabilitata
 */
function StatCard({ title, value, icon, color, onClick, disabled }) {
  return (
    <Card elevation={0} sx={{ height: '100%' }}>
      <CardActionArea 
        onClick={onClick} 
        disabled={disabled}
        sx={{ height: '100%' }}
      >
        <CardContent>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            justifyContent: 'space-between' 
          }}>
            <Box>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                {title}
              </Typography>
              <Typography variant="h4" fontWeight={700}>
                {value}
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: `${color}.50`,
                color: `${color}.main`,
                p: 1.5,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {icon}
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default StatCard
