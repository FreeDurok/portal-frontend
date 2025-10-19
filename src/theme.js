import { createTheme } from '@mui/material/styles'

// Modern Orange & Purple palette
// Inspired by sunset/twilight themes
export const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#FF6B35' : '#FF5722', // Vibrant Orange
      light: '#FF8A65',
      dark: '#E64A19',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: mode === 'dark' ? '#9C27B0' : '#7B1FA2', // Deep Purple
      light: '#BA68C8',
      dark: '#6A1B9A',
      contrastText: '#FFFFFF',
    },
    accent: {
      main: mode === 'dark' ? '#FFB74D' : '#FFA726', // Warm Amber
      light: '#FFD54F',
      dark: '#F57C00',
    },
    background: {
      default: mode === 'dark' ? '#121212' : '#F5F5F7',
      paper: mode === 'dark' ? '#1E1E1E' : '#FFFFFF',
    },
    text: {
      primary: mode === 'dark' ? '#E0E0E0' : '#1A1A1A',
      secondary: mode === 'dark' ? '#B0B0B0' : '#666666',
    },
    divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
  },
  typography: {
    fontFamily: '"Titillium Web", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 24px',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: mode === 'dark' 
              ? '0 4px 12px rgba(255, 107, 53, 0.3)'
              : '0 4px 12px rgba(255, 87, 34, 0.2)',
          },
        },
        contained: {
          background: mode === 'dark'
            ? 'linear-gradient(135deg, #FF6B35 0%, #FF8A65 100%)'
            : 'linear-gradient(135deg, #FF5722 0%, #FF7043 100%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: mode === 'dark'
            ? '0 4px 12px rgba(0, 0, 0, 0.4)'
            : '0 2px 8px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: mode === 'dark'
              ? '0 8px 24px rgba(156, 39, 176, 0.3)'
              : '0 8px 24px rgba(123, 31, 162, 0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: mode === 'dark'
            ? '0 2px 8px rgba(0, 0, 0, 0.4)'
            : '0 2px 8px rgba(0, 0, 0, 0.08)',
          background: mode === 'dark'
            ? 'linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 100%)'
            : 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F7 100%)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
  },
})

export default getTheme('light')
