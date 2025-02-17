import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../services/api';

// Async thunk to fetch topics by chapter_id
export const fetchTopicsByChapterId = createAsyncThunk(
  'topics/fetchTopicsByChapterId',
  async (chapterId: string, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`/topics/chapter/${chapterId}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch topics by chapter ID'
      );
    }
  }
);

// Define the state type
interface TopicState {
  topics: any[]; // Replace `any[]` with the actual type for topic data if available
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: TopicState = {
  topics: [],
  loading: false,
  error: null,
};

// Create the slice
const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch topics by chapter_id
      .addCase(fetchTopicsByChapterId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopicsByChapterId.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
      })
      .addCase(fetchTopicsByChapterId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch topics by chapter ID';
      });
  },
});

// Export the reducer to be used in the store
export default topicSlice.reducer;
