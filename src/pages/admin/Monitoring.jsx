import {
  Box,
  Typography,
  Grid,
  Alert,
  Button,
  Paper,
  CircularProgress,
  Stack
} from '@mui/material'
import { Refresh as RefreshIcon } from '@mui/icons-material'
import { useMonitoring } from '../../hooks/useMonitoring'
import HealthSummaryCard from '../../components/monitoring/HealthSummaryCard'
import ServiceStatusCard from '../../components/monitoring/ServiceStatusCard'
import ApplicationsHealthCard from '../../components/monitoring/ApplicationsHealthCard'

function Monitoring() {
  const { healthData, loading, error, isPolling, refetch } = useMonitoring(10000, true)

  // Loading state
  if (loading && !healthData) {
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
            bgcolor: 'background.paper',
          }}
        >
          <CircularProgress sx={{ mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Caricamento dati di monitoring...
          </Typography>
        </Paper>
      </Box>
    )
  }

  // Error state
  if (error && !healthData) {
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

        <Alert 
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={refetch}>
              Riprova
            </Button>
          }
        >
          {error}
        </Alert>
      </Box>
    )
  }

  const services = healthData?.services || {}
  const servicesArray = Object.entries(services)

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Monitoring Servizi
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitora lo stato di salute dei servizi in tempo reale • Aggiornamento automatico ogni 10 secondi
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={refetch}
          disabled={isPolling}
        >
          Aggiorna
        </Button>
      </Box>

      {/* Error Alert (if error but we still have cached data) */}
      {error && healthData && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Errore durante l'aggiornamento: {error}. Visualizzazione ultimi dati disponibili.
        </Alert>
      )}

      <Stack spacing={3}>
        {/* Overall Health Summary */}
        <HealthSummaryCard healthData={healthData} isPolling={isPolling} />

        {/* Applications Health */}
        {healthData?.applications && healthData.applications.length > 0 && (
          <Box>
            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
              Stato Applicazioni
            </Typography>
            <ApplicationsHealthCard applications={healthData.applications} />
          </Box>
        )}

        {/* Services Grid */}
        <Box>
          <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
            Dettaglio Servizi
          </Typography>
          <Grid container spacing={3}>
            {servicesArray.map(([key, service]) => (
              <Grid item xs={12} md={6} lg={4} key={key}>
                <ServiceStatusCard service={service} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Info Note */}
        <Alert severity="info">
          <strong>Nota:</strong> Il sistema esegue controlli automatici ogni 10 secondi. 
          I dati vengono aggiornati in background senza necessità di ricaricare la pagina.
        </Alert>
      </Stack>
    </Box>
  )
}

export default Monitoring
