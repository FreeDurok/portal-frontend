import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
  IconButton
} from '@mui/material'
import { Login as LoginIcon, Visibility, VisibilityOff } from '@mui/icons-material'
import useAuthStore from '../../store/authStore'
import { authAPI } from '../../api/auth'

function AdminLogin() {
  const navigate = useNavigate()
  const { login, isAuthenticated, user, setTempToken } = useAuthStore()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user?.is_admin) {
      navigate('/admin', { replace: true })
    }
  }, [isAuthenticated, user, navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const tokenData = await authAPI.login(formData.username, formData.password)
      
      // Temporarily set token in store so getCurrentUser can use it
      // Using setTempToken to avoid triggering the redirect useEffect
      setTempToken(tokenData.access_token)
      
      try {
        // Now fetch user data with the token
        const userData = await authAPI.getCurrentUser()
        
        if (!userData.is_admin) {
          // Not admin, remove token and show error
          useAuthStore.getState().logout()
          setError('Credenziali non valide o accesso non autorizzato')
          setLoading(false)
          return
        }

        // Update store with user data and navigate
        login(tokenData.access_token, userData)
        navigate('/admin')
      } catch (userErr) {
        // Failed to get user data, remove token
        useAuthStore.getState().logout()
        throw userErr
      }
    } catch (err) {
      // Generic error message to prevent username enumeration
      // Don't reveal if username exists or if password is wrong
      setError('Credenziali non valide. Verifica username e password.')
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <LoginIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              Admin Login
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Accedi all'area amministrazione
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
              required
              autoFocus
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3 }}
            >
              {loading ? 'Accesso in corso...' : 'Accedi'}
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button
              variant="text"
              onClick={() => navigate('/')}
            >
              Torna al portale
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default AdminLogin
