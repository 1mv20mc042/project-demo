import { createTheme } from '@mui/material/styles';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ed6c02',
    },
    success: {
      main: '#2e7d32',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      lineHeight: 1.2,
      marginBottom: '0.5rem',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 1.2,
      marginBottom: '0.5rem',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.2,
      marginBottom: '0.5rem',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.2,
      marginBottom: '0.5rem',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.2,
      marginBottom: '0.5rem',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.2,
      marginBottom: '0.5rem',
    },
    button: {
      textTransform: 'none', // Prevents automatic uppercase
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
        },
        containedPrimary: {
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(25, 118, 210, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: 16,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;