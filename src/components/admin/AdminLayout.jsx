import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Apps as AppsIcon,
  People as PeopleIcon,
  MonitorHeart as MonitorIcon,
  Description as LogsIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Brightness4,
  Brightness7,
  Language,
  Home as HomeIcon
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import useAuthStore from '../../store/authStore'
import { useThemeMode } from '../../contexts/ThemeContext'

const DRAWER_WIDTH = 260

function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t, i18n } = useTranslation()
  const { user, logout } = useAuthStore()
  const { mode, toggleTheme } = useThemeMode()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [langAnchor, setLangAnchor] = useState(null)

  const menuItems = [
    {
      text: t('nav.dashboard'),
      icon: <DashboardIcon />,
      path: '/admin'
    },
    {
      text: t('nav.applications'),
      icon: <AppsIcon />,
      path: '/admin/applications'
    },
    {
      text: t('nav.users'),
      icon: <PeopleIcon />,
      path: '/admin/users'
    },
    {
      text: t('nav.monitoring'),
      icon: <MonitorIcon />,
      path: '/admin/monitoring'
    },
    {
      text: t('nav.logs'),
      icon: <LogsIcon />,
      path: '/admin/logs'
    }
  ]

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleMenuClick = (path) => {
    navigate(path)
    setMobileOpen(false)
  }

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleUserMenuClose = () => {
    setAnchorEl(null)
  }

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

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin'
    }
    return location.pathname.startsWith(path)
  }

  const drawer = (
    <Box>
      <Toolbar sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        py: 2 
      }}>
        <Typography variant="h6" fontWeight={700} color="primary">
          Admin Panel
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ px: 2, py: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={isActive(item.path)}
              onClick={() => handleMenuClick(item.path)}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white'
                  }
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: isActive(item.path) ? 600 : 400
                }}
              />
              {item.badge && (
                <Box 
                  sx={{ 
                    px: 1, 
                    py: 0.5, 
                    bgcolor: 'grey.300', 
                    borderRadius: 1,
                    fontSize: 10
                  }}
                >
                  {item.badge}
                </Box>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: 'text.primary' }}>
            {t('dashboard.title')} - Admin
          </Typography>
          
          <Tooltip title={t('nav.home')}>
            <IconButton onClick={() => navigate('/')} sx={{ mr: 1, color: 'text.primary' }}>
              <HomeIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title={i18n.language === 'it' ? 'Lingua' : 'Language'}>
            <IconButton onClick={handleLanguageClick} sx={{ mr: 1, color: 'text.primary' }}>
              <Language />
            </IconButton>
          </Tooltip>
          
          <Tooltip title={mode === 'dark' ? (i18n.language === 'it' ? 'Modalità chiara' : 'Light mode') : (i18n.language === 'it' ? 'Modalità scura' : 'Dark mode')}>
            <IconButton onClick={toggleTheme} sx={{ mr: 1, color: 'text.primary' }}>
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
          <IconButton onClick={handleUserMenuOpen} sx={{ color: 'text.primary' }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
              {user?.username?.[0]?.toUpperCase() || 'A'}
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Language Menu */}
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

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleUserMenuClose}
        onClick={handleUserMenuClose}
      >
        <MenuItem disabled>
          <PersonIcon sx={{ mr: 1 }} fontSize="small" />
          {user?.username}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 1 }} fontSize="small" />
          {t('nav.logout')}
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
          bgcolor: 'background.default'
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}

export default AdminLayout
