import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../services/api';

// Define the UserProfile interface
interface UserProfile {
  name: string;
  id?: string; // Made optional
  email: string;
  date_of_birth: string;
  occupation: string;
  education_level: string;
  user_class: string;
  language: string;
  profile_image: string;
}

interface ProfileState {
  profile: UserProfile;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: {
    name: '',
    email: '',
    date_of_birth: '1990-10-10',
    occupation: '',
    education_level: '',
    user_class: '',
    language: '',
    profile_image: '',
  },
  loading: false,
  error: null,
};

// Fetch user profile from API
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get('/users/profile');
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to fetch user profile');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'An unexpected error occurred');
    }
  }
);

// Update user profile
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (userData: UserProfile, { rejectWithValue }) => {
    try {
      const response = await axiosApi.put('/users/profile/update', userData);
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to update user profile');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'An unexpected error occurred');
    }
  }
);

// Upload profile image
export const uploadProfileImage = createAsyncThunk(
  'profile/uploadProfileImage',
  async (file: File, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axiosApi.post('/users/profile/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        return response.data.data.image_url;
      } else {
        throw new Error(response.data.message || 'Failed to upload image');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Upload failed');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<UserProfile>) {
      state.profile = action.payload;
    },
    setProfileImage(state, action: PayloadAction<string>) {
      state.profile.profile_image = action.payload;
    },
    resetProfile(state) {
      state.profile = initialState.profile;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(uploadProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.profile.profile_image = action.payload;
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { setProfile, setProfileImage, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
