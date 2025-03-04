import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL
const BASE_URL = "http://astromagic.guru:8002";

// Request parameters structure
interface GenerateRequestParams {
  subject: string;
  grade: string;
  topic: string;
}

// Define section structure for text response
interface Section {
  type: string;
  data?: string;
  url?: string;
  alt_text?: string;
}

// Define response structures
interface GenerateTextResponse {
  title: string;
  description: string;
  sections: Section[];
}

interface AudioSegment {
  start: number;
  end: number;
  text: string;
}

interface GenerateAudioResponse {
  title: string;
  description: string;
  text: string;
  audio_url: string;
  segments: { word: string; start_time: number; end_time: number }[];
}

interface GenerateVideoResponse {
  title: string;
  description: string;
  video_url: string;
}

// Redux state structure
interface SmartLearningState {
  textResponse: GenerateTextResponse | null;
  audioResponse: { title: string; description: string; text: string; audio_url: string; segments: AudioSegment[] } | null;
  videoResponse: GenerateVideoResponse | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Async thunk for text generation
export const generateText = createAsyncThunk<
  GenerateTextResponse,
  GenerateRequestParams,
  { rejectValue: string }
>("smartLearning/generateText", async (params, thunkAPI) => {
  try {
    const response = await axios.post<GenerateTextResponse>(`${BASE_URL}/generate-text/`, params);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to generate text");
  }
});

// Async thunk for audio generation
export const generateAudio = createAsyncThunk<
  GenerateAudioResponse,
  GenerateRequestParams,
  { rejectValue: string }
>("smartLearning/generateAudio", async (params, thunkAPI) => {
  try {
    const response = await axios.post<GenerateAudioResponse>(`${BASE_URL}/generate-audio/`, params);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to generate audio");
  }
});

// Async thunk for video generation
export const generateVideo = createAsyncThunk<
  GenerateVideoResponse,
  GenerateRequestParams,
  { rejectValue: string }
>("smartLearning/generateVideo", async (params, thunkAPI) => {
  try {
    const response = await axios.post<GenerateVideoResponse>(`${BASE_URL}/generate-video/`, params);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to generate video");
  }
});

// Create Redux slice
const smartLearningSlice = createSlice({
  name: "smartLearning",
  initialState: {
    textResponse: null,
    audioResponse: null,
    videoResponse: null,
    status: "idle",
    error: null,
  } as SmartLearningState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Text Generation
      .addCase(generateText.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(generateText.fulfilled, (state, action: PayloadAction<GenerateTextResponse>) => {
        state.status = "succeeded";
        state.textResponse = {
          ...action.payload,
          sections: action.payload.sections.map((sec) => ({
            type: sec.type,
            data: sec.data || "",
            url: sec.url || "",
            alt_text: sec.alt_text || "",
          })),
        };
      })
      .addCase(generateText.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to generate text";
      })
      // Audio Generation
      .addCase(generateAudio.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(generateAudio.fulfilled, (state, action: PayloadAction<GenerateAudioResponse>) => {
        state.status = "succeeded";
        state.audioResponse = {
          title: action.payload.title,
          description: action.payload.description,
          text: action.payload.text,
          audio_url: action.payload.audio_url,
          segments: action.payload.segments.map((seg) => ({
            start: seg.start_time,
            end: seg.end_time,
            text: seg.word,
          })),
        };
      })
      .addCase(generateAudio.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to generate audio";
      })
      // Video Generation
      .addCase(generateVideo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(generateVideo.fulfilled, (state, action: PayloadAction<GenerateVideoResponse>) => {
        state.status = "succeeded";
        state.videoResponse = action.payload;
      })
      .addCase(generateVideo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to generate video";
      });
  },
});

export default smartLearningSlice.reducer;
