import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../services/api';

// Define the type for the chat response
type ChatResponse = {
  answer: string;
  suggested_questions: string[];
};

// Define the type for the state
interface ChatState {
  question: string;
  answer: string; // Store the latest answer
  suggested_questions: string[]; // Store suggested questions
  loading: boolean;
  error: string | null; // Error can be a string or null
}

// Initial state with necessary fields
const initialState: ChatState = {
  question: '',
  answer: '',
  suggested_questions: [],
  loading: false,
  error: null,
};

// Define the async thunk to send a chat question and fetch the response
export const sendChatQuestion = createAsyncThunk(
  'chat/sendChatQuestion',
  async (
    payload: { question: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosApi.post('/chat/ask-question', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        return {
          answer: response.data.data.answer, // Extract answer
          suggested_questions: response.data.data.suggested_questions || [], // Ensure it is an array
        };
      } else {
        throw new Error(response.data.message || 'Failed to send the chat question.');
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'An unexpected error occurred.'
      );
    }
  }
);

// Create the slice
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    resetChat: (state) => {
      state.question = '';
      state.answer = '';
      state.suggested_questions = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendChatQuestion.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendChatQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.answer = action.payload.answer;
        state.suggested_questions = action.payload.suggested_questions;
        state.error = null;
      })
      .addCase(sendChatQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { resetChat } = chatSlice.actions;
export default chatSlice.reducer;
