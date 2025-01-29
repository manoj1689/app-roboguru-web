import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api'; // Adjust the path based on your actual service

// Define the UserProfile interface
interface UserProfile {
  name: string;
  email: string;
  date_of_birth: string;
  occupation: string;
  education_level: string;
  user_class: string;
  language: string;
  profile_image: string; // New field added
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
    date_of_birth: '',
    occupation: '',
    education_level: '',
    user_class: '',
    language: '',
    profile_image: '', // Initialize with an empty string
  },
  loading: false,
  error: null,
};

// Async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/users/profile', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        console.log('profile in function', response.data.data);
        return response.data.data; // Return the fetched user profile
      } else {
        throw new Error(response.data.message || 'Failed to fetch user profile');
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'An unexpected error occurred'
      );
    }
  }
);

// Async thunk to update user profile
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (userData: UserProfile, { rejectWithValue }) => {
    try {
      const response = await axios.put('/users/profile/update', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        return response.data.data; // Return the updated profile data
      } else {
        throw new Error(response.data.message || 'Failed to update user profile');
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'An unexpected error occurred'
      );
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.profile.name = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.profile.email = action.payload;
    },
    setDateOfBirth(state, action: PayloadAction<string>) {
      state.profile.date_of_birth = action.payload;
    },
    setOccupation(state, action: PayloadAction<string>) {
      state.profile.occupation = action.payload;
    },
    setEducationLevel(state, action: PayloadAction<string>) {
      state.profile.education_level = action.payload;
    },
    setClass(state, action: PayloadAction<string>) {
      state.profile.user_class = action.payload;
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.profile.language = action.payload;
    },
    setProfileImage(state, action: PayloadAction<string>) { // New action for profile image
      state.profile.profile_image = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;

        // Save the profile in localStorage after successful fetch
        localStorage.setItem('user_profile', JSON.stringify(action.payload));
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || 'Failed to fetch user profile.';
      })

      // Update user profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;

        // Save the updated profile in localStorage
        localStorage.setItem('user_profile', JSON.stringify(action.payload));
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || 'Failed to update user profile.';
      });
  },
});

// Export actions for local state updates
export const {
  setName,
  setEmail,
  setDateOfBirth,
  setOccupation,
  setEducationLevel,
  setClass,
  setLanguage,
  setProfileImage, // Export the new action
} = profileSlice.actions;

export default profileSlice.reducer;
