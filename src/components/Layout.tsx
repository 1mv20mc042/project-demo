import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  CssBaseline, 
  useMediaQuery 
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../types';
import theme from '../theme';

const Layout: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar 
          position="static" 
          elevation={0}
          sx={{ 
            backgroundColor: 'white', 
            borderBottom: '1px solid #e0e0e0',
            transition: 'all 0.3s ease-in-out'
          }}
        >
          <Toolbar>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                flexGrow: 1, 
                color: theme.palette.primary.main,
                fontWeight: 600,
                letterSpacing: '-0.5px'
              }}
            >
              Profile Manager
            </Typography>
            
            {profile && (
              <Typography 
                variant="body1" 
                sx={{ 
                  color: theme.palette.text.primary,
                  fontWeight: 500,
                  animation: 'fadeIn 0.5s ease-in-out',
                  '@keyframes fadeIn': {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 }
                  }
                }}
              >
                {isMobile ? profile.name.split(' ')[0] : profile.name}
              </Typography>
            )}
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="md" sx={{ flexGrow: 1, py: 4 }}>
          <Outlet />
        </Container>
        
        <Box 
          component="footer" 
          sx={{ 
            py: 3, 
            textAlign: 'center',
            borderTop: '1px solid #e0e0e0',
            backgroundColor: 'white',
            mt: 'auto'
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Profile Management App
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;