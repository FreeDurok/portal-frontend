import { createTheme } from '@mui/material/styles'

// Modern Orange & Purple palette
// Inspired by sunset/twilight themes
export const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#FF5722' : '#F4511E', // Vibrant Orange
      light: '#FF8A65',
      lighter: mode === 'dark' ? '#FFE0D6' : '#FFEBEE',
      dark: '#E64A19',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: mode === 'dark' ? '#FB8C00' : '#EF6C00', // Deep Orange/Burnt Orange
      light: '#FFB74D',
      lighter: mode === 'dark' ? '#FFF3E0' : '#FFF3E0',
      dark: '#E65100',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      lighter: mode === 'dark' ? 'rgba(76, 175, 80, 0.15)' : '#E8F5E9',
      dark: '#388E3C',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FF9800',
      light: '#FFB74D',
      lighter: mode === 'dark' ? 'rgba(255, 152, 0, 0.15)' : '#FFF3E0',
      dark: '#F57C00',
      contrastText: '#000000',
    },
    error: {
      main: '#F44336',
      light: '#E57373',
      lighter: mode === 'dark' ? 'rgba(244, 67, 54, 0.15)' : '#FFEBEE',
      dark: '#D32F2F',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#2196F3',
      light: '#64B5F6',
      lighter: mode === 'dark' ? 'rgba(33, 150, 243, 0.15)' : '#E3F2FD',
      dark: '#1976D2',
      contrastText: '#FFFFFF',
    },
    accent: {
      main: mode === 'dark' ? '#FFB74D' : '#FFA726', // Warm Amber
      light: '#FFD54F',
      dark: '#F57C00',
    },
    grey: {
      50: mode === 'dark' ? '#FAFAFA' : '#FAFAFA',
      100: mode === 'dark' ? '#F5F5F5' : '#F5F5F5',
      200: mode === 'dark' ? '#EEEEEE' : '#EEEEEE',
      300: mode === 'dark' ? '#E0E0E0' : '#E0E0E0',
      400: mode === 'dark' ? '#BDBDBD' : '#BDBDBD',
      500: mode === 'dark' ? '#9E9E9E' : '#9E9E9E',
      600: mode === 'dark' ? '#757575' : '#757575',
      700: mode === 'dark' ? '#616161' : '#616161',
      800: mode === 'dark' ? '#424242' : '#424242',
      900: mode === 'dark' ? '#212121' : '#212121',
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
              ? '0 4px 12px rgba(255, 87, 34, 0.3)'
              : '0 4px 12px rgba(244, 81, 30, 0.2)',
          },
        },
        contained: {
          background: mode === 'dark'
            ? 'linear-gradient(135deg, #FF5722 0%, #FF7043 100%)'
            : 'linear-gradient(135deg, #F4511E 0%, #FF6F43 100%)',
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
              ? '0 8px 24px rgba(255, 87, 34, 0.3)'
              : '0 8px 24px rgba(244, 81, 30, 0.15)',
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
