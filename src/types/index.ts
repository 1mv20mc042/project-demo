export interface Profile {
  id?: string;
  name: string;
  email: string;
  age?: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: 'success' | 'error';
}

export interface RootState {
  profile: ProfileState;
}

export interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}