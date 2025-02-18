import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../services/api";

// Define the state interface for classes
interface Class {
  id: number;
  name: string;
  tagline: string;
  image_link: string;
  level_id: number; // Matches your structure
}

interface ClassState {
  classes: Class[]; // Ensure this is an array
  selectedClass:any | null;
  loading: boolean;
  error: string | null;
  classDetails: any | null; // Add a new field to store details of a specific class
}

// Initial state
const initialState: ClassState = {
  classes: [], // Initialize as an empty array
  selectedClass:null,
  loading: false,
  error: null,
  classDetails: null, // Initialize as null
};

// Async thunk to fetch classes
export const fetchClasses = createAsyncThunk(
  "classes/fetchClasses",
  async ({ limit = 10, name = "" }: { limit?: number; name?: string }, { rejectWithValue }) => {
    try {
      console.log("Fetching classes with:", { limit, name });

      const response = await axiosApi.get("/classes/read_class_list", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          limit,
          name,
        },
      });

      console.log("Received classes:", response.data);

      if (response.data.success) {
        return response.data.data || []; // Ensure it returns an array, even if null
      } else {
        throw new Error(response.data.message || "Failed to fetch classes");
      }
    } catch (error: any) {
      console.error("Error fetching classes:", error.message || error);

      return rejectWithValue(
        error.response?.data?.message || error.message || "An unexpected error occurred"
      );
    }
  }
);

// Async thunk to fetch details of a class by class_id
export const fetchClassDetails = createAsyncThunk(
  "classes/fetchClassDetails",
  async (class_id: any, { rejectWithValue }) => {
    try {
      

      const response = await axiosApi.get(`/classes/level/${class_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Received class details:", response.data);

      if (response.data.success) {
        return response.data || {}; // Return the class details data
      } else {
        throw new Error(response.data.message || "Failed to fetch class details");
      }
    } catch (error: any) {
      console.error("Error fetching class details:", error.message || error);

      return rejectWithValue(
        error.response?.data?.message || error.message || "An unexpected error occurred"
      );
    }
  }
);





// Async thunk to fetch classes by level_id
export const fetchClassesByLevel = createAsyncThunk(
  "classes/fetchClassesByLevel",
  async (level_id: string, { rejectWithValue }) => {
    try {
      console.log("Fetching classes for level_id:", level_id);

      const response = await axiosApi.get(`/classes/level/${level_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Received classes for level:", response.data);

      if (response.data.success) {
        return response.data.data || []; // Ensure it returns an array
      } else {
        throw new Error(response.data.message || "Failed to fetch classes by level");
      }
    } catch (error: any) {
      console.error("Error fetching classes by level:", error.message || error);

      return rejectWithValue(
        error.response?.data?.message || error.message || "An unexpected error occurred"
      );
    }
  }
);


// Create the slice
const classSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null; // Action to reset the error state
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch classes
      .addCase(fetchClasses.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new fetch
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload; // Replace with the fetched data
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch classes.";
      })

      // Fetch class details by class_id
      .addCase(fetchClassDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.classDetails = null; // Reset previous class details
      })
      .addCase(fetchClassDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.classDetails = action.payload; // Store the fetched class details
        
      })
      .addCase(fetchClassDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch class details.";
      })

      
      // Fetch classes by level_id
      .addCase(fetchClassesByLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClassesByLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload; // Replace with the fetched data
      })
      .addCase(fetchClassesByLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch classes by level.";
      });
  },
});

// Export the synchronous actions
export const { resetError } = classSlice.actions;

// Export the reducer
export default classSlice.reducer;
