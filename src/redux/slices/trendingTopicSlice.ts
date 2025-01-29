import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

// Async thunk to fetch trending topics by class_id
export const fetchTrendingTopicsByClassId = createAsyncThunk(
  'trendingTopics/fetchTrendingTopicsByClassId',
  async (classId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/trending/trending_topics/by_class/${classId}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch trending topics by class ID'
      );
    }
  }
);

// Define the state type
interface TrendingTopicState {
  trendingTopics: any[]; // Replace `any[]` with the actual type for trending topic data if available
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: TrendingTopicState = {
  trendingTopics: [],
  loading: false,
  error: null,
};

// Create the slice
const trendingTopicSlice = createSlice({
  name: 'trendingTopics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch trending topics by class_id
      .addCase(fetchTrendingTopicsByClassId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingTopicsByClassId.fulfilled, (state, action) => {
        state.loading = false;
        state.trendingTopics = action.payload;
      })
      .addCase(fetchTrendingTopicsByClassId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch trending topics by class ID';
      });
  },
});

// Export the reducer to be used in the store
export default trendingTopicSlice.reducer;
