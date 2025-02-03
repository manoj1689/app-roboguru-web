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
  profile_image: string; // Profile image URL
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
        console.log('Profile data:', response.data.data);
        return response.data.data;
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
        return response.data.data;
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

export const uploadProfileImage = createAsyncThunk(
  'profile/uploadProfileImage',
  async (file: File, { rejectWithValue, dispatch }) => {
    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('file', file); // Append the file to the FormData

      // Send the file via axios POST request
      const response = await axios.post('/users/profile/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json', // Ensures the server returns JSON
        },
      });

      // Check if the response was successful
      if (response.data.success) {
        console.log('Image uploaded successfully:', response.data.data.image_url);
        
        // Dispatch the setProfileImage action to update the profile image in the Redux state
        dispatch(setProfileImage(response.data.data.image_url));

        // Return the image URL
        return response.data.data.image_url;
      } else {
        console.log('Upload failed:', response.data.message);
        throw new Error(response.data.message || 'Failed to upload image');
      }
    } catch (error: any) {
      console.error('Error during image upload:', error);
      return rejectWithValue(error.response?.data?.message || 'Upload failed');
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
    setProfileImage(state, action: PayloadAction<string>) {
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
        localStorage.setItem('user_profile', JSON.stringify(action.payload));
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update user profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        localStorage.setItem('user_profile', JSON.stringify(action.payload));
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Upload profile image
      .addCase(uploadProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.profile.profile_image = action.payload;
        localStorage.setItem(
          'user_profile',
          JSON.stringify({ ...state.profile, profile_image: action.payload })
        );
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const {
  setName,
  setEmail,
  setDateOfBirth,
  setOccupation,
  setEducationLevel,
  setClass,
  setLanguage,
  setProfileImage,
} = profileSlice.actions;

export default profileSlice.reducer;
