import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  fetchProfile,
  saveProfile,
  updateProfile,
  deleteProfile,
  clearError
} from '../store/profileSlice';
import { RootState, Profile } from '../types';
import { AppDispatch } from '../store';

export const useProfileActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { profile, loading, error } = useSelector((state: RootState) => state.profile);

  const getProfile = useCallback(async () => {
    try {
      await dispatch(fetchProfile()).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  }, [dispatch]);

  const createOrUpdateProfile = useCallback(async (profileData: Profile) => {
    try {
      if (profile && profile.id) {
        await dispatch(updateProfile({ ...profileData, id: profile.id })).unwrap();
      } else {
        await dispatch(saveProfile(profileData)).unwrap();
      }
      navigate('/profile');
      return true;
    } catch (error) {
      return false;
    }
  }, [dispatch, navigate, profile]);

  const removeProfile = useCallback(async () => {
    try {
      await dispatch(deleteProfile()).unwrap();
      navigate('/profile-form');
      return true;
    } catch (error) {
      return false;
    }
  }, [dispatch, navigate]);

  const resetError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    profile,
    loading,
    error,
    getProfile,
    createOrUpdateProfile,
    removeProfile,
    resetError,
  };
};