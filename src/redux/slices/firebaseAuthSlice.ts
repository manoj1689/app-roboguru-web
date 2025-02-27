import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi, { setAuthToken } from "../../services/api"; // Import `setAuthToken`

const initialState = {
  isLoading: false,
  token: null,
  error: null,
  profile_updated: null,
  user_profile: null,
};

// Async thunk for Firebase login
export const firebaseLogin = createAsyncThunk(
  'auth/firebaseLogin',
  async (idToken: string, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post('/firebase/firebase-login', {
        id_token: idToken, 
      });

     
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Redux Slice
const firebaseAuthSlice = createSlice({
  name: 'firebaseAuth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.profile_updated = null;
      state.user_profile = null;
      setAuthToken(null); // Remove token from axios
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(firebaseLogin.fulfilled, (state, action) => {
        state.token = action.payload?.data?.access_token || null;
        state.profile_updated = action.payload?.profile_updated ?? null;
        state.user_profile = action.payload?.data || null;

        setAuthToken(state.token); // Dynamically set token for future requests
      })
  },
});

export const { logout } = firebaseAuthSlice.actions;
export default firebaseAuthSlice.reducer;
