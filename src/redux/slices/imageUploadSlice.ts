import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../services/api';

// Define the shape of the AI response
interface AIResponse {
  text_response: string;
  language_used: string;
  model_used: string;
  additional_data?: any;
}

// Define the shape of the state
interface ImageUploadState {
  uploadedImageUrls: string[]; // Stores uploaded image URLs
  aiResponse: AIResponse | null; // Explicitly define type
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ImageUploadState = {
  uploadedImageUrls: [],
  aiResponse: null, // ✅ Corrected this line
  loading: false,
  error: null,
};

// **Async function to upload multiple images**
export const uploadImages = createAsyncThunk(
  "imageUpload/uploadImages",
  async (file: File, { rejectWithValue }) => {
    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('file', file); // Append the file to the FormData

      // Send the file via axios POST request
      const response = await axios.post("/openaiengine/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });

      if (response.status === 200) {
        return response.data.data.image_url; // Expecting an array of uploaded image URLs
      } else {
        throw new Error("Failed to upload images");
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Image upload failed");
    }
  }
);

// **Async function to process images with OpenAI**
export const processImagesWithAI = createAsyncThunk(
  "imageUpload/processImagesWithAI",
  async (
    { imageUrls, prompt, languageCode }: { imageUrls: string[]; prompt: string; languageCode: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/openaiengine/images-to-text/", {
        image_urls: imageUrls,
        prompt,
        language_code: languageCode,
      });

      if (response.status === 200) {
        return response.data.data as AIResponse; // ✅ Ensure correct type
      } else {
        throw new Error("Failed to process images with AI");
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "AI processing failed");
    }
  }
);

// **Image Upload Slice**
const imageUploadSlice = createSlice({
  name: "imageUpload",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Upload Images
      .addCase(uploadImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadedImageUrls = action.payload; // Store uploaded URLs
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Process Images with AI
      .addCase(processImagesWithAI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processImagesWithAI.fulfilled, (state, action) => {
        state.loading = false;
        state.aiResponse = action.payload as AIResponse; // ✅ Cast to correct type
      })
      .addCase(processImagesWithAI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default imageUploadSlice.reducer;
