import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profileSlice';
import { RootState } from '../types';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});

export type AppDispatch = typeof store.dispatch;