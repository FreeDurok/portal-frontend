import { useState, useEffect } from 'react'
import { 
  Container, 
  Typography, 
  Grid, 
  Box,
  CircularProgress,
  Alert
} from '@mui/material'
import ApplicationCard from '../components/ApplicationCard'
import { applicationsAPI } from '../api/applications'

function Dashboard() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadApplications()
  }, [])

  const loadApplications = async () => {
    try {
      setLoading(true)
      const data = await applicationsAPI.getAll()
      setApplications(data)
      setError(null)
    } catch (err) {
      setError('Errore nel caricamento delle applicazioni')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          Portale Applicazioni
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Accedi alle tue applicazioni in modo semplice e veloce
        </Typography>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {!loading && applications.length === 0 && (
        <Alert severity="info">
          Nessuna applicazione disponibile al momento
        </Alert>
      )}

      <Grid container spacing={3}>
        {applications.map((app) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={app.id}>
            <ApplicationCard application={app} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Dashboard
