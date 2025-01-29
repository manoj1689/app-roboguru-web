import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../services/api";

// Define the types for your slice state
interface FirebaseAuthState {
  isLoading: boolean;
  token: string | null;
  error: string | null;
}

// Initial state
const initialState: FirebaseAuthState = {
  isLoading: false,
  token: null,
  error: null,
};

export const firebaseLogin = createAsyncThunk(
  'auth/firebaseLogin',
  async (idToken: string, { rejectWithValue }) => {
    try {
      // Send the Firebase ID token in the request body as JSON
      const response = await axios.post('/firebase/firebase-login', {
        id_token: idToken, // The token from Firebase
      });

      console.log('Firebase login response:', response.data);
      return response.data; // Return the response data on success
    } catch (error: any) {
      console.error('Firebase login error:', error.response?.data);
      // Return the error message using rejectWithValue
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Create a slice with reducers and actions
const firebaseAuthSlice = createSlice({
  name: 'firebaseAuth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(firebaseLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(firebaseLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;

        // Save the token to localStorage on successful login
        if (action.payload?.data.access_token) {
          localStorage.setItem('access_token', action.payload.data.access_token);
        }
      })
      .addCase(firebaseLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export the actions and reducer
export default firebaseAuthSlice.reducer;
