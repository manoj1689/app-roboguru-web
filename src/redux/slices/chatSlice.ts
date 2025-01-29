import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

// Define the type for each chat history entry
type ChatHistoryEntry = {
  role: string;
  content: string;
};

// Define the type for the chat response
type ChatResponse = {
  answer: string;
  details: string;
  suggested_questions: string[];
};

// Define the type for the state
interface ChatState {
  session_id: string;
  class_name: string;
  subject_name: string;
  chapter_name: string;
  topic_name: string;
  question: string;
  chat_history: ChatHistoryEntry[]; // Array of chat history entries
  answer: string; // Store the latest answer
  details: string; // Store additional details
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
  chat_history: [], // Initialize as an empty array
  answer: '', // Initialize as an empty string
  details: '', // Initialize as an empty string
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
      chat_history: ChatHistoryEntry[];
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post('/chat/ask-question', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        console.log('Chat Slice Response:', response.data.data);
        return response.data.data; // Assuming response contains the updated chat history and other fields
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
      state.chat_history = []; // Reset chat history to an empty array
      state.answer = ''; // Reset answer to an empty string
      state.details = ''; // Reset details to an empty string
      state.suggested_questions = []; // Reset suggested questions to an empty array
      state.loading = false;
      state.error = null; // Reset error to null
    },
    updateChatHistory: (state, action) => {
      state.chat_history.push(action.payload); // Add new chat history entry
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendChatQuestion.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendChatQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.chat_history = action.payload.chat_history; // Update chat history
        state.answer = action.payload.answer; // Update answer
        state.details = action.payload.details; // Update details
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
export const { resetChat, updateChatHistory } = chatSlice.actions;
export default chatSlice.reducer;
