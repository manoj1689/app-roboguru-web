import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from "../../services/api";

// Define the types for your slice state
interface FirebaseAuthState {
  isLoading: boolean;
  token: string | null;
  error: string | null;
  profile_updated: boolean | null;
  user_profile: object | null;
}

// Initial state
const initialState: FirebaseAuthState = {
  isLoading: false,
  token: null,
  error: null,
  profile_updated: null, // Now it's null initially
  user_profile: null,
};

// Async thunk for Firebase login
export const firebaseLogin = createAsyncThunk(
  'auth/firebaseLogin',
  async (idToken: string, { rejectWithValue }) => {
    try {
      // Send Firebase ID token in request
      const response = await axiosApi.post('/firebase/firebase-login', {
        id_token: idToken, 
      });

      console.log('Firebase login response:', response.data);
      return response.data; // Return the response data on success
    } catch (error: any) {
      console.error('Firebase login error:', error.response?.data);
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Create a slice with reducers and actions
const firebaseAuthSlice = createSlice({
  name: 'firebaseAuth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.profile_updated = null; 
      state.user_profile = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('profile_updated');
      localStorage.removeItem('user_profile');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(firebaseLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(firebaseLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload?.data?.access_token || null;
        state.profile_updated = action.payload?.profile_updated ?? null;
        state.user_profile = action.payload?.data || null; // This correctly assigns `data` as `user_profile`
      
        // Debugging logs
        console.log('Firebase login successful:', action.payload);
      
        // Save token, profile_updated, and user_profile if they exist
        if (state.token) {
          localStorage.setItem('access_token', state.token);
        }
        if (state.profile_updated !== null) {
          localStorage.setItem('profile_updated', JSON.stringify(state.profile_updated));
        }
        if (state.user_profile) {
          localStorage.setItem('user_profile', JSON.stringify(state.user_profile)); // Ensure it gets stored correctly
        }
      })
      
      .addCase(firebaseLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        
        // Clear any potentially stale data on failed login
        localStorage.removeItem('access_token');
        localStorage.removeItem('profile_updated');
        localStorage.removeItem('user_profile');
      });
  },
});

// Export the logout action and reducer
export const { logout } = firebaseAuthSlice.actions;
export default firebaseAuthSlice.reducer;
