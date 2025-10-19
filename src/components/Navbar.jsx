import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Dashboard, Apps, Logout } from '@mui/icons-material'
import useAuthStore from '../store/authStore'

function Navbar({ admin = false }) {
  const navigate = useNavigate()
  const { logout, user } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <Dashboard sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
          {admin ? 'Portale Applicazioni - Admin' : 'Portale Applicazioni'}
        </Typography>
        
        {admin && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              color="inherit" 
              startIcon={<Dashboard />}
              onClick={() => navigate('/admin')}
            >
              Dashboard
            </Button>
            <Button 
              color="inherit" 
              startIcon={<Apps />}
              onClick={() => navigate('/admin/applications')}
            >
              Applicazioni
            </Button>
            <Button 
              color="inherit" 
              startIcon={<Logout />}
              onClick={handleLogout}
            >
              Logout ({user?.username})
            </Button>
          </Box>
        )}
        
        {!admin && (
          <Button 
            color="inherit" 
            onClick={() => navigate('/admin/login')}
          >
            Admin Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
