import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

// Async thunk to fetch education levels
export const fetchEducationLevels = createAsyncThunk(
  'educationLevels/fetchEducationLevels',
  async ({ limit = 10, name = "" }: { limit?: number; name?: string }, { rejectWithValue }) => {
    try {
      console.log('Fetching education levels with:', { limit, name });

      const response = await axios.get('/level/read_list', {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          limit,
          name,
        },
      });

      console.log('Received education levels:', response.data);

      if (response.data.success) {
        return response.data.data || []; // Ensure it returns an array, even if null
      } else {
        throw new Error(response.data.message || 'Failed to fetch education levels');
      }
    } catch (error: any) {
      console.error("Error fetching education levels:", error.message || error);

      return rejectWithValue(
        error.response?.data?.message || error.message || 'An unexpected error occurred'
      );
    }
  }
);



// Async thunk to fetch a specific education level by ID
export const fetchEducationLevelById = createAsyncThunk(
  'educationLevels/fetchEducationLevelById',
  async (levelId: string, { rejectWithValue }) => {
    try {
      console.log('Fetching education level with ID:', levelId);

      const response = await axios.get(`/level/${levelId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log('Received education level:', response.data);

      if (response.data.success) {
        return response.data.data; // Return the fetched education level data
      } else {
        throw new Error(response.data.message || 'Failed to fetch education level');
      }
    } catch (error: any) {
      console.error("Error fetching education level:", error.message || error);

      return rejectWithValue(
        error.response?.data?.message || error.message || 'An unexpected error occurred'
      );
    }
  }
);




// Define the state interface for education levels
interface EducationLevel {
  id: number;
  name: string;
  description: string;
}

interface EducationLevelState {
  educationLevels: EducationLevel[]; // Ensure this is an array
  selectedEducationLevel: EducationLevel | null; // Specific level fetched by ID
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: EducationLevelState = {
  educationLevels: [], // Initialize as an empty array
  selectedEducationLevel: null, 
  loading: false,
  error: null,
};

// Create the slice
const educationLevelSlice = createSlice({
  name: 'educationLevels',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch education levels
      .addCase(fetchEducationLevels.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new fetch
      })
      .addCase(fetchEducationLevels.fulfilled, (state, action) => {
        state.loading = false;
        state.educationLevels = action.payload; // Replace with the fetched data
      })
      .addCase(fetchEducationLevels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch education levels.';
      })

      
      // Fetch a specific education level by ID
      .addCase(fetchEducationLevelById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEducationLevelById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEducationLevel = action.payload; // Store the fetched level
      })
      .addCase(fetchEducationLevelById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch education level.';
      })

      
  },
});

// Export the reducer
export default educationLevelSlice.reducer;
