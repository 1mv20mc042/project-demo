import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 500,
          width: '100%',
          borderRadius: 3,
          textAlign: 'center',
          animation: 'fadeIn 0.5s ease-in-out',
          '@keyframes fadeIn': {
            '0%': { opacity: 0, transform: 'translateY(20px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' }
          }
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: '5rem',
            fontWeight: 700,
            color: 'primary.main',
            mb: 2,
          }}
        >
          404
        </Typography>
        
        <Typography
          variant="h5"
          component="h2"
          sx={{
            mb: 3,
            fontWeight: 600,
          }}
        >
          Page Not Found
        </Typography>
        
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/')}
          sx={{
            fontWeight: 600,
            minWidth: 150,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: 3,
            }
          }}
        >
          Go Home
        </Button>
      </Paper>
    </Box>
  );
};

export default NotFound;