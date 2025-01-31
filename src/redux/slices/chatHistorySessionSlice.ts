import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../services/api'; // Adjust the path if needed

// Define the ChatSession interface
interface ChatSession {
  session_id: string;
  title: string;
  status: string;
  last_message: string | null;
  last_message_time: string | null;
  started_at: string;
  ended_at: string | null;
}

interface ChatMessage {
  role: string; // "user" or "assistant"
  content: string; // Message content
  timestamp: string; // Timestamp of the message
}

// Define the chat history structure
interface ChatHistory {
  class_name?: string;
  subject_name?: string;
  chapter_name?: string;
  topic_name?: string;
  session_id: string;
  data: ChatMessage[];
}

// Define the state interface
interface ChatState {
  chatSessions: ChatSession[];
  chatHistory: ChatHistory | null; // Store entire object instead of just an array
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ChatState = {
  chatSessions: [],
  chatHistory: null, // Set to null initially
  loading: false,
  error: null,
};

// Async thunk to fetch chat sessions
export const fetchChatSessions = createAsyncThunk<ChatSession[], void, { rejectValue: string }>(
  'chat/fetchChatSessions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/chat/sessions', {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        return response.data.data as ChatSession[]; // Ensure correct type
      } else {
        return rejectWithValue(response.data.message || 'Failed to fetch chat sessions');
      }
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || error.message || 'An unexpected error occurred');
    }
  }
);

// Async thunk to fetch chat history for a specific session
export const fetchChatHistory = createAsyncThunk<ChatHistory, string, { rejectValue: string }>(
  'chat/fetchChatHistory',
  async (sessionId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/chat/sessions/${sessionId}/chats`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        return response.data as ChatHistory; // Ensure correct type
      } else {
        return rejectWithValue(response.data.message || 'Failed to fetch chat history');
      }
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || error.message || 'An unexpected error occurred');
    }
  }
);

// Chat slice
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // Reducer to reset all chat data
    resetChat(state) {
      state.chatSessions = [];
      state.chatHistory = null; // Reset chat history
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchChatSessions
      .addCase(fetchChatSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatSessions.fulfilled, (state, action: PayloadAction<ChatSession[]>) => {
        state.loading = false;
        state.chatSessions = action.payload;
      })
      .addCase(fetchChatSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch chat sessions';
      })

      // Handle fetchChatHistory
      .addCase(fetchChatHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action: PayloadAction<ChatHistory>) => {
        state.loading = false;
        state.chatHistory = action.payload;
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch chat history';
      });
  },
});

// Export actions
export const { resetChat } = chatSlice.actions;

// Export the reducer
export default chatSlice.reducer;
