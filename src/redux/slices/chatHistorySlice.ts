import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../services/api'; // Adjust the path based on your service file

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
  session_id: string;            // The session identifier
  request_message: string;       // The request message
  response_message: string;      // The response message
  status: string;                // The status of the chat
  timestamp: string;             // Timestamp for the message
}
// Define the state interface
interface ChatState {
  chatSessions: ChatSession[];
  chatHistory: ChatMessage[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ChatState = {
  chatSessions: [],
  chatHistory: [],
  loading: false,
  error: null,
};

// Async thunk to fetch chat sessions
export const fetchChatSessions = createAsyncThunk(
  'chat/fetchChatSessions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/chat/sessions', {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        console.log('Chat sessions fetched:', response.data);
        return response.data.data; // Return the session data
      } else {
        throw new Error(response.data.message || 'Failed to fetch chat sessions');
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'An unexpected error occurred'
      );
    }
  }
);

// Async thunk to fetch chat history for a specific session
export const fetchChatHistory = createAsyncThunk(
  'chat/fetchChatHistory',
  async (sessionId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/chat/sessions/${sessionId}/chats`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        console.log('Chat history fetched for session:', response.data);
        return response.data.data; // Return the chat history data
      } else {
        throw new Error(response.data.message || 'Failed to fetch chat history');
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'An unexpected error occurred'
      );
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
      state.chatHistory = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchChatSessions
    builder
      .addCase(fetchChatSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatSessions.fulfilled, (state, action: PayloadAction<ChatSession[]>) => {
        state.loading = false;
        state.chatSessions = action.payload;
      })
      .addCase(fetchChatSessions.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch chat sessions';
      });

    // Handle fetchChatHistory
    builder
      .addCase(fetchChatHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action: PayloadAction<ChatMessage[]>) => {
        state.loading = false;
        state.chatHistory = action.payload;
      })
      .addCase(fetchChatHistory.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch chat history';
      });
  },
});

// Export actions
export const { resetChat } = chatSlice.actions;

// Export the reducer
export default chatSlice.reducer;
