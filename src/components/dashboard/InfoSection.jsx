import { Paper, Typography } from '@mui/material'

/**
 * Sezione informativa per note di sistema e messaggi importanti
 */
function InfoSection({ title, items, icon }) {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        bgcolor: 'info.50', 
        border: '1px solid', 
        borderColor: 'info.200' 
      }}
    >
      <Typography variant="h6" fontWeight={600} gutterBottom color="info.main">
        {icon} {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {items.map((item, index) => (
          <span key={index}>
            • {item}
            {index < items.length - 1 && <br />}
          </span>
        ))}
      </Typography>
    </Paper>
  )
}

export default InfoSection
