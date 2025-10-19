import { AppBar, Toolbar, Typography, Button, Box, IconButton, Tooltip, Menu, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Dashboard, Apps, Logout, Brightness4, Brightness7, Language, Home } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import useAuthStore from '../store/authStore'
import { useThemeMode } from '../contexts/ThemeContext'

function Navbar({ admin = false }) {
  const navigate = useNavigate()
  const { logout, user } = useAuthStore()
  const { mode, toggleTheme } = useThemeMode()
  const { t, i18n } = useTranslation()
  const [langAnchor, setLangAnchor] = useState(null)

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const handleLanguageClick = (event) => {
    setLangAnchor(event.currentTarget)
  }

  const handleLanguageClose = () => {
    setLangAnchor(null)
  }

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang)
    handleLanguageClose()
  }

  return (
    <AppBar position="static" elevation={0} color="default">
      <Toolbar>
        <Dashboard sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
          {admin ? t('nav.adminPortal') : t('nav.publicPortal')}
        </Typography>
        
        <Tooltip title={t('nav.language')}>
          <IconButton onClick={handleLanguageClick} color="inherit" sx={{ mr: 1 }}>
            <Language />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={langAnchor}
          open={Boolean(langAnchor)}
          onClose={handleLanguageClose}
        >
          <MenuItem 
            onClick={() => handleLanguageChange('it')}
            selected={i18n.language === 'it'}
          >
            🇮🇹 Italiano
          </MenuItem>
          <MenuItem 
            onClick={() => handleLanguageChange('en')}
            selected={i18n.language === 'en'}
          >
            🇬🇧 English
          </MenuItem>
        </Menu>
        
        <Tooltip title={mode === 'dark' ? t('nav.lightMode') : t('nav.darkMode')}>
          <IconButton onClick={toggleTheme} color="inherit" sx={{ mr: 2 }}>
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Tooltip>
        
        {admin && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              color="inherit" 
              startIcon={<Home />}
              onClick={() => navigate('/')}
            >
              {t('nav.home')}
            </Button>
            <Button 
              color="inherit" 
              startIcon={<Dashboard />}
              onClick={() => navigate('/admin')}
            >
              {t('nav.dashboard')}
            </Button>
            <Button 
              color="inherit" 
              startIcon={<Apps />}
              onClick={() => navigate('/admin/applications')}
            >
              {t('nav.applications')}
            </Button>
            <Button 
              color="inherit" 
              startIcon={<Logout />}
              onClick={handleLogout}
            >
              {t('nav.logout')} ({user?.username})
            </Button>
          </Box>
        )}
        
        {!admin && (
          <Button 
            variant="contained"
            onClick={() => window.open('/admin/login', '_blank')}
          >
            {t('nav.adminLogin')}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
