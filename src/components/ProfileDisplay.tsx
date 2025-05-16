import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button, 
  CircularProgress, 
  Alert, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Fade,
  Divider,
  Grid
} from '@mui/material';
import { Edit, Trash2 } from 'lucide-react';
import { useProfileActions } from '../hooks/useProfileActions';
import theme from '../theme';

const ProfileDisplay: React.FC = () => {
  const navigate = useNavigate();
  const { profile, loading, error, getProfile, removeProfile } = useProfileActions();
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  
  useEffect(() => {
    const fetchProfile = async () => {
      const success = await getProfile();
      if (!success && !loading) {
        // If profile doesn't exist, redirect to the form
        navigate('/profile-form');
      }
    };
    
    fetchProfile();
  }, [getProfile, navigate, loading]);
  
  const handleEditProfile = () => {
    navigate('/profile-form');
  };
  
  const handleDeleteDialog = () => {
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  const handleDeleteProfile = async () => {
    setIsDeleting(true);
    await removeProfile();
    setIsDeleting(false);
    setOpenDialog(false);
    navigate('/profile-form');
  };
  
  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '50vh'
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Alert 
          severity="error" 
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => navigate('/profile-form')}
          sx={{ mt: 2 }}
        >
          Create Profile
        </Button>
      </Box>
    );
  }
  
  if (!profile) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', textAlign: 'center', mt: 8 }}>
        <Typography variant="h5" gutterBottom>
          No profile found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Please create a profile to get started
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/profile-form')}
          size="large"
        >
          Create Profile
        </Button>
      </Box>
    );
  }
  
  return (
    <Fade in={!!profile} timeout={500}>
      <Box sx={{ 
        maxWidth: 800, 
        mx: 'auto',
        animation: 'fadeIn 0.5s ease-in-out',
        '@keyframes fadeIn': {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            mb: 4, 
            fontWeight: 600,
            textAlign: 'center',
            color: theme => theme.palette.primary.main
          }}
        >
          Profile Details
        </Typography>
        
        <Card 
          sx={{ 
            borderRadius: 3,
            boxShadow: 3,
            overflow: 'hidden',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: 6
            }
          }}
        >
          <Box 
            sx={{ 
              height: 120, 
              bgcolor: 'primary.main',
              position: 'relative'
            }}
          />
          
          <CardContent sx={{ p: 4, pt: 6 }}>
            <Box 
              sx={{ 
                width: 100,
                height: 100,
                bgcolor: 'secondary.main',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '2.5rem',
                fontWeight: 'bold',
                position: 'absolute',
                top: 70,
                left: '50%',
                transform: 'translateX(-50%)',
                border: '4px solid white',
                boxShadow: 2
              }}
            >
              {profile.name.charAt(0)}
            </Box>
            
            <Box sx={{ mt: 4, mb: 4 }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  textAlign: 'center',
                  fontWeight: 600,
                  mb: 1
                }}
              >
                {profile.name}
              </Typography>
              
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ 
                  textAlign: 'center',
                  mb: 3
                }}
              >
                {profile.email}
              </Typography>
              
              <Divider sx={{ mb: 4 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {profile.email}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Age
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {profile.age !== undefined ? profile.age : 'Not specified'}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              mt: 3
            }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Edit size={18} />}
                onClick={handleEditProfile}
                sx={{ 
                  fontWeight: 600,
                  minWidth: 120
                }}
              >
                Edit
              </Button>
              
              <Button
                variant="outlined"
                color="error"
                startIcon={<Trash2 size={18} />}
                onClick={handleDeleteDialog}
                sx={{ 
                  fontWeight: 600,
                  minWidth: 120
                }}
              >
                Delete
              </Button>
            </Box>
          </CardContent>
        </Card>
        
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete Your Profile?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This action cannot be undone. Are you sure you want to delete your profile?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} disabled={isDeleting}>
              Cancel
            </Button>
            <Button 
              onClick={handleDeleteProfile} 
              color="error" 
              autoFocus
              disabled={isDeleting}
            >
              {isDeleting ? <CircularProgress size={24} /> : 'Delete'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Fade>
  );
};

export default ProfileDisplay;