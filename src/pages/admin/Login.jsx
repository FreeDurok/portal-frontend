import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert
} from '@mui/material'
import { Login as LoginIcon } from '@mui/icons-material'
import useAuthStore from '../../store/authStore'
import { authAPI } from '../../api/auth'

function AdminLogin() {
  const navigate = useNavigate()
  const { login, isAuthenticated, user } = useAuthStore()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
      
      // Save token first so it can be used in the next request
      login(tokenData.access_token, null)
      
      // Now fetch user data with the token in place
      const userData = await authAPI.getCurrentUser()
      
      if (!userData.is_admin) {
        setError('Accesso negato: permessi amministratore richiesti')
        setLoading(false)
        return
      }

      // Update with user data
      login(tokenData.access_token, userData)
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.detail || 'Errore durante il login')
    } finally {
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
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
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
