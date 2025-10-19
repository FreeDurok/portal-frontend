import { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box
} from '@mui/material'
import { Apps, People } from '@mui/icons-material'
import { applicationsAPI } from '../../api/applications'

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalApps: 0,
    activeApps: 0
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const apps = await applicationsAPI.getAll()
      setStats({
        totalApps: apps.length,
        activeApps: apps.filter(app => app.is_active).length
      })
    } catch (err) {
      console.error(err)
    }
  }

  const StatCard = ({ title, value, icon, color }) => (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 700, color }}>
            {value}
          </Typography>
        </Box>
        <Box 
          sx={{ 
            bgcolor: `${color}20`, 
            borderRadius: 2, 
            p: 2,
            color 
          }}
        >
          {icon}
        </Box>
      </Box>
    </Paper>
  )

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
        Dashboard Amministrazione
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StatCard
            title="Applicazioni Totali"
            value={stats.totalApps}
            icon={<Apps sx={{ fontSize: 40 }} />}
            color="#0066CC"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatCard
            title="Applicazioni Attive"
            value={stats.activeApps}
            icon={<Apps sx={{ fontSize: 40 }} />}
            color="#4CAF50"
          />
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Benvenuto nell'area amministrazione
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Da qui puoi gestire tutte le applicazioni del portale. Usa il menu di navigazione per accedere alle diverse sezioni.
        </Typography>
      </Paper>
    </Container>
  )
}

export default AdminDashboard
