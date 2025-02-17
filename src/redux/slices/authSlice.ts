import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../services/api";

// Initial state for authentication
interface AuthState {
  mobile: string | null;
  token: string | null;
  otpSent: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  mobile: null,
  token: null,
  otpSent: false,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (mobile: string, { rejectWithValue }) => {
    try {
      // Send the mobile number in the request body as JSON
      const response = await axiosApi.post("/signin", {
        mobile_number: mobile,
      });

      console.log("Login response:", response.data);
      return response.data; // Return the response data on success
    } catch (error: any) {
      console.error("Login error:", error.response?.data);
      // Return the error message using rejectWithValue
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Thunk for verifying OTP and getting the token
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (
    { mobile, otp }: { mobile: string; otp: string },
    { rejectWithValue }
  ) => {
    try {
      // Send the mobile number and OTP in the request body as JSON
      const response = await axiosApi.post("/verify_otp", {
        mobile_number: mobile,
        otp: otp,
      });

      console.log("Verify OTP response:", response.data.data);

      if (response.data.data?.access_token) {
        // Save the access token in localStorage
        localStorage.setItem("mobile_access_token", response.data.data.access_token);
      }

      return response.data; // Return the response data on success
    } catch (error: any) {
      console.error("Verify OTP error:", error.response?.data);
      // Return the error message using rejectWithValue
      return rejectWithValue(error.response?.data?.message || "OTP verification failed");
    }
  }
);


// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.mobile = null;
      state.token = null;
      state.otpSent = false;
      state.loading = false;
      state.error = null;

      // Remove token from localStorage when logging out
      localStorage.removeItem("access_token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true; // Mark OTP as sent
        state.mobile = action.payload.mobile; // Store the mobile number
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle OTP verification
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token || null; // Store token if available
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      
  },
});

// Export actions
export const { logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
