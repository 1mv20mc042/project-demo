import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { profileService } from '../services/api';
import { Profile, ProfileState } from '../types';

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    const response = await profileService.getProfile();
    if (response.status === 'error') {
      return rejectWithValue(response.error);
    }
    return response.data;
  }
);

export const saveProfile = createAsyncThunk(
  'profile/saveProfile',
  async (profile: Profile, { rejectWithValue }) => {
    const response = await profileService.saveProfile(profile);
    if (response.status === 'error') {
      return rejectWithValue(response.error);
    }
    return response.data;
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profile: Profile, { rejectWithValue }) => {
    const response = await profileService.updateProfile(profile);
    if (response.status === 'error') {
      return rejectWithValue(response.error);
    }
    return response.data;
  }
);

export const deleteProfile = createAsyncThunk(
  'profile/deleteProfile',
  async (_, { rejectWithValue }) => {
    const response = await profileService.deleteProfile();
    if (response.status === 'error') {
      return rejectWithValue(response.error);
    }
    return undefined;
  }
);

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<Profile | undefined>) => {
        state.loading = false;
        state.profile = action.payload || null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(saveProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProfile.fulfilled, (state) => {
        state.loading = false;
        state.profile = null;
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = profileSlice.actions;
export default profileSlice.reducer;