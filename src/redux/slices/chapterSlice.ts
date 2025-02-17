import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../services/api';

// Async thunk to fetch chapters by subject_id
export const fetchChaptersBySubjectId = createAsyncThunk(
  'chapters/fetchChaptersBySubjectId',
  async (subjectId: string, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`/chapters/chapter/${subjectId}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch chapters by subject ID'
      );
    }
  }
);

// Define the state type
interface ChapterState {
  chapters: any[]; // Replace `any[]` with the actual type for chapter data if available
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: ChapterState = {
  chapters: [],
  loading: false,
  error: null,
};

// Create the slice
const chapterSlice = createSlice({
  name: 'chapter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch chapters by subject_id
      .addCase(fetchChaptersBySubjectId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChaptersBySubjectId.fulfilled, (state, action) => {
        state.loading = false;
        state.chapters = action.payload;
      })
      .addCase(fetchChaptersBySubjectId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch chapters by subject ID';
      });
  },
});

// Export the reducer to be used in the store
export default chapterSlice.reducer;
