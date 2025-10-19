import {
  Card,
  CardActionArea,
  Box,
  Typography
} from '@mui/material'

/**
 * Card per azioni rapide con icona, titolo, descrizione e badge opzionale
 */
function QuickActionCard({ title, description, icon, onClick, disabled, badge }) {
  return (
    <Card elevation={0}>
      <CardActionArea onClick={onClick} disabled={disabled} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Icon Container */}
          <Box
            sx={{
              bgcolor: 'primary.50',
              color: 'primary.main',
              p: 2,
              borderRadius: 2,
              display: 'flex'
            }}
          >
            {icon}
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6" fontWeight={600}>
                {title}
              </Typography>
              {badge && (
                <Box 
                  sx={{ 
                    px: 1, 
                    py: 0.5, 
                    bgcolor: 'action.selected', 
                    color: 'text.secondary',
                    borderRadius: 1,
                    fontSize: 11,
                    fontWeight: 600
                  }}
                >
                  {badge}
                </Box>
              )}
            </Box>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  )
}

export default QuickActionCard
