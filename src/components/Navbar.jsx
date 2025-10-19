import { AppBar, Toolbar, Typography, Button, Box, IconButton, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Dashboard, Apps, Logout, Brightness4, Brightness7 } from '@mui/icons-material'
import useAuthStore from '../store/authStore'
import { useThemeMode } from '../contexts/ThemeContext'

function Navbar({ admin = false }) {
  const navigate = useNavigate()
  const { logout, user } = useAuthStore()
  const { mode, toggleTheme } = useThemeMode()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <AppBar position="static" elevation={0} color="default">
      <Toolbar>
        <Dashboard sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
          {admin ? 'Portale Applicazioni - Admin' : 'Portale Applicazioni'}
        </Typography>
        
        <Tooltip title={mode === 'dark' ? 'Modalità chiara' : 'Modalità scura'}>
          <IconButton onClick={toggleTheme} color="inherit" sx={{ mr: 2 }}>
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Tooltip>
        
        {admin && (
          <Box sx={{ display: 'flex', gap: 1 }}>
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
            variant="contained"
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
