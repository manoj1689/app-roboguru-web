

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../services/api';

// Define the type for the chat response
type ChatResponse = {
  answer: string;
  suggested_questions: string[];
  chat_summary: string;
};

// Define the type for the state
interface ChatState {
  session_id: string;
  class_name: string;
  subject_name: string;
  chapter_name: string;
  topic_name: string;
  question: string;
  chat_summary: string; // Store the chat summary
  answer: string; // Store the latest answer
  suggested_questions: string[]; // Store suggested questions
  loading: boolean;
  error: string | null; // Error can be a string or null
}

// Initial state with proper typing
const initialState: ChatState = {
  session_id: '',
  class_name: '',
  subject_name: '',
  chapter_name: '',
  topic_name: '',
  question: '',
  chat_summary: '', // Initialize as an empty string
  answer: '', // Initialize as an empty string
  suggested_questions: [], // Initialize as an empty array
  loading: false,
  error: null,
};

// Define the async thunk to send a chat question and fetch the response
export const sendChatQuestion = createAsyncThunk(
  'chat/sendChatQuestion',
  async (
    payload: {
      session_id: string;
      class_name: string;
      subject_name: string;
      chapter_name: string;
      topic_name: string;
      question: string;
    },
    { rejectWithValue }
  ) => {
    try {
      // Print base URL
      console.log('Base URL:', axiosApi.defaults.baseURL);
      const response = await axiosApi.post('/chat/ask-question', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        console.log('Chat Slice Response:', response.data.data);
        return {
          answer: response.data.data.answer, // Extract answer correctly
          suggested_questions: response.data.data.suggested_questions || [], // Ensure it is an array
          chat_summary: response.data.data.chat_summary || '', // Extract chat summary
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
      state.session_id = '';
      state.class_name = '';
      state.subject_name = '';
      state.chapter_name = '';
      state.topic_name = '';
      state.question = '';
      state.chat_summary = ''; // Reset chat summary
      state.answer = ''; // Reset answer
      state.suggested_questions = []; // Reset suggested questions
      state.loading = false;
      state.error = null; // Reset error to null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendChatQuestion.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendChatQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.chat_summary = action.payload.chat_summary; // Update chat summary
        state.answer = action.payload.answer; // Update answer
        state.suggested_questions = action.payload.suggested_questions; // Update suggested questions
        state.error = null; // Clear error on success
      })
      .addCase(sendChatQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Set the error message
      });
  },
});

// Export actions and reducer
export const { resetChat } = chatSlice.actions;
export default chatSlice.reducer;
