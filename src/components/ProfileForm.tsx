import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Alert, 
  Snackbar,
  CircularProgress
} from '@mui/material';
import { useProfileActions } from '../hooks/useProfileActions';
import { Profile } from '../types';

const ProfileForm: React.FC = () => {
  const { profile, loading, error, createOrUpdateProfile, resetError } = useProfileActions();
  
  const [formData, setFormData] = useState<Profile>({
    name: '',
    email: '',
    age: undefined
  });
  
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    age: false
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    age: ''
  });
  
  const [successMessage, setSuccessMessage] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        age: profile.age
      });
      setIsEditMode(true);
    }
  }, [profile]);
  
  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) {
          return 'Name is required';
        }
        if (value.trim().length < 3) {
          return 'Name must be at least 3 characters';
        }
        return '';
      
      case 'email':
        if (!value.trim()) {
          return 'Email is required';
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address';
        }
        return '';
      
      case 'age':
        if (value !== undefined && value !== '') {
          const age = Number(value);
          if (isNaN(age) || age < 0 || age > 150) {
            return 'Please enter a valid age between 0 and 150';
          }
        }
        return '';
      
      default:
        return '';
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      age: validateField('age', formData.age)
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    const updatedValue = name === 'age' 
      ? value === '' ? undefined : Number(value)
      : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: updatedValue
    }));
    
    // Validate field if it's been touched
    if (touched[name as keyof typeof touched]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      age: true
    });
    
    if (!validateForm()) {
      return;
    }
    
    const success = await createOrUpdateProfile(formData);
    
    if (success) {
      setSuccessMessage(isEditMode ? 'Profile updated successfully!' : 'Profile created successfully!');
    }
  };
  
  const handleCloseSnackbar = () => {
    setSuccessMessage('');
  };
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
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
          color: theme => theme.palette.primary.main
        }}
      >
        {isEditMode ? 'Edit Your Profile' : 'Create Your Profile'}
      </Typography>
      
      <Card sx={{ width: '100%', maxWidth: 600, mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 3 }}
              onClose={resetError}
            >
              {error}
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              margin="normal"
              variant="outlined"
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
              disabled={loading}
              required
              inputProps={{ minLength: 3 }}
              sx={{ mb: 2 }}
            />
            
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              margin="normal"
              variant="outlined"
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
              disabled={loading}
              required
              sx={{ mb: 2 }}
            />
            
            <TextField
              label="Age (optional)"
              name="age"
              type="number"
              value={formData.age === undefined ? '' : formData.age}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              margin="normal"
              variant="outlined"
              error={touched.age && !!errors.age}
              helperText={touched.age && errors.age}
              disabled={loading}
              inputProps={{ min: 0, max: 150 }}
              sx={{ mb: 3 }}
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={loading}
                sx={{ 
                  minWidth: 150,
                  fontWeight: 600,
                  boxShadow: 2,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  isEditMode ? 'Update Profile' : 'Create Profile'
                )}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
      
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfileForm;