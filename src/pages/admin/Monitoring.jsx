import {
  Box,
  Paper,
  Typography,
  Alert,
  AlertTitle
} from '@mui/material'
import { Construction as ConstructionIcon } from '@mui/icons-material'

function Monitoring() {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Monitoring Servizi
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitora lo stato di salute dei servizi in tempo reale
        </Typography>
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          p: 6, 
          textAlign: 'center',
          bgcolor: 'grey.50',
          border: '2px dashed',
          borderColor: 'grey.300'
        }}
      >
        <ConstructionIcon sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
        <Typography variant="h5" fontWeight={600} gutterBottom>
          In Sviluppo
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Questa funzionalità sarà disponibile nella prossima release
        </Typography>

        <Alert severity="info" sx={{ maxWidth: 600, mx: 'auto' }}>
          <AlertTitle>Funzionalità Previste</AlertTitle>
          • Health check automatico dei servizi<br />
          • Polling in background per monitoraggio continuo<br />
          • Dashboard con stato real-time<br />
          • Notifiche in caso di problemi<br />
          • Storico uptime e metriche
        </Alert>
      </Paper>
    </Box>
  )
}

export default Monitoring
