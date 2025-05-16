import axios from 'axios';
import { Profile, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock API implementation
const mockDelay = () => new Promise<void>((resolve) => setTimeout(resolve, 500));

export const profileService = {
  async getProfile(): Promise<ApiResponse<Profile>> {
    try {
      // In a real app, this would be an actual API call
      // const response = await api.get('/profile');
      // return { data: response.data, status: 'success' };
      
      await mockDelay();
      
      // Check if profile exists in local storage
      const storedProfile = localStorage.getItem('profile');
      if (!storedProfile) {
        return { error: 'Profile not found', status: 'error' };
      }
      
      return { data: JSON.parse(storedProfile), status: 'success' };
    } catch (error) {
      console.error('Error fetching profile:', error);
      return {
        error: 'Failed to fetch profile. Please try again later.',
        status: 'error',
      };
    }
  },

  async saveProfile(profile: Profile): Promise<ApiResponse<Profile>> {
    try {
      // In a real app, this would be an actual API call
      // const response = await api.post('/profile', profile);
      // return { data: response.data, status: 'success' };
      
      await mockDelay();
      
      // Store in local storage
      const updatedProfile = { ...profile, id: profile.id || crypto.randomUUID() };
      localStorage.setItem('profile', JSON.stringify(updatedProfile));
      
      return { data: updatedProfile, status: 'success' };
    } catch (error) {
      console.error('Error saving profile:', error);
      return {
        error: 'Failed to save profile. Please try again later.',
        status: 'error',
      };
    }
  },

  async updateProfile(profile: Profile): Promise<ApiResponse<Profile>> {
    try {
      // In a real app, this would be an actual API call
      // const response = await api.put(`/profile/${profile.id}`, profile);
      // return { data: response.data, status: 'success' };
      
      await mockDelay();
      
      // Update in local storage
      localStorage.setItem('profile', JSON.stringify(profile));
      
      return { data: profile, status: 'success' };
    } catch (error) {
      console.error('Error updating profile:', error);
      return {
        error: 'Failed to update profile. Please try again later.',
        status: 'error',
      };
    }
  },

  async deleteProfile(): Promise<ApiResponse<void>> {
    try {
      // In a real app, this would be an actual API call
      // await api.delete('/profile');
      
      await mockDelay();
      
      // Remove from local storage
      localStorage.removeItem('profile');
      
      return { status: 'success' };
    } catch (error) {
      console.error('Error deleting profile:', error);
      return {
        error: 'Failed to delete profile. Please try again later.',
        status: 'error',
      };
    }
  }
};

export default api;