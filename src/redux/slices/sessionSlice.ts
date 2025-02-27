import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../services/api';

// Async thunk to create a new session
export const createSession = createAsyncThunk(
  'session/createSession',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post('/chat/sessions/start');
      
      // Ensure response structure before accessing properties
      const sessionData = response.data?.data;
      if (!sessionData?.session_id) {
        throw new Error("Invalid session response");
      }

      return {
        session_id: sessionData.session_id || null,
        status: sessionData.status || "unknown",
        started_at: sessionData.started_at || new Date().toISOString(),
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to start a new session'
      );
    }
  }
);

// Define the state type
interface SessionState {
  sessionId: string | null;
  status: string | null;
  startedAt: string | null;
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: SessionState = {
  sessionId: null,
  status: null,
  startedAt: null,
  loading: false,
  error: null,
};

// Create the slice
const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    resetSessionState: (state) => {
      state.sessionId = null;
      state.status = null;
      state.startedAt = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle createSession thunk
      .addCase(createSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionId = action.payload.session_id;
        state.status = action.payload.status;
        state.startedAt = action.payload.started_at;
      })
      .addCase(createSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to start a new session';
      });
  },
});

// Export actions and reducer
export const { resetSessionState } = sessionSlice.actions;
export default sessionSlice.reducer;
