import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

// Define types for the progress structure
interface Topic {
  topic_id: string;
  is_completed: boolean;
}

interface Chapter {
  chapter_id: string;
  chapter_name: string;
  topics: Topic[];
  chapter_progress: number;
}

interface Subject {
  subject_id: string;
  subject_name: string;
  chapters: Chapter[];
  subject_progress: number;
}

interface UserProgress {
  user_id: string;
  subjects: Subject[];
}

// Async thunk to fetch user progress by user_id
export const fetchUserProgress = createAsyncThunk(
  'userProgress/fetchUserProgress',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/user_progress/user-progress/${userId}`);
      return response.data.data; // Assuming `data` contains the progress array
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch user progress'
      );
    }
  }
);

// Async thunk to update user topic progress
export const updateUserTopicProgress = createAsyncThunk(
  'userProgress/updateUserTopicProgress',
  async (
    progressData: { topic_id: string; is_completed: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put('/user_progress/user-progress/', progressData);
      return response.data; // Return the response data if successful
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to update user topic progress'
      );
    }
  }
);

// Define the state type
interface UserProgressState {
  userProgress: UserProgress | null; // User progress data structure
  successMessage: string | null;
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: UserProgressState = {
  userProgress: null,
  successMessage: null,
  loading: false,
  error: null,
};

// Create the slice
const userProgressSlice = createSlice({
  name: 'userProgress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch user progress by user_id
      .addCase(fetchUserProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.userProgress = action.payload;
      })
      .addCase(fetchUserProgress.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || 'Failed to fetch user progress';
      })
      // Update user topic progress
      .addCase(updateUserTopicProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateUserTopicProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message || 'User topic progress updated successfully';
      })
      .addCase(updateUserTopicProgress.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || 'Failed to update user topic progress';
        state.successMessage = null;
      });
  },
});

// Export the reducer to be used in the store
export default userProgressSlice.reducer;
