import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../services/api';

// Async thunk to fetch subjects by class_id
export const fetchSubjectsByClassId = createAsyncThunk(
  'subjects/fetchSubjectsByClassId',
  async (classId: string, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`/subjects/class/${classId}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch subjects by class ID'
      );
    }
  }
);

// Define the state type
interface SubjectState {
  subjects: any[]; // Replace `any[]` with the actual type for subject data if available
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: SubjectState = {
  subjects: [],
  loading: false,
  error: null,
};

// Create the slice
const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch subjects by class_id
      .addCase(fetchSubjectsByClassId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjectsByClassId.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(fetchSubjectsByClassId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch subjects by class ID';
      });
  },
});

// Export the reducer to be used in the store
export default subjectSlice.reducer;
