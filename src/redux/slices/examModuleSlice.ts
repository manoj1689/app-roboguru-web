import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from "../../services/api";

interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

interface ExamsObjectiveState {
  questions: ExamQuestion[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface FetchQuestionsParams {
  class_name: string;
  subject_name: string;
  chapter_name: string;
  topic_name: string;
  num_questions: number;
  difficulty: string;
}

export const fetchObjectiveQuestions = createAsyncThunk<
  ExamQuestion[],
  FetchQuestionsParams,
  { rejectValue: string }
>(
  'exams/fetchObjectiveQuestions',
  async (params, thunkAPI) => {
    try {
      const response = await axios.post<ExamQuestion[]>('/exams/objective', params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch questions');
    }
  }
);

export const fetchTrueFalseQuestions = createAsyncThunk<
  ExamQuestion[],
  FetchQuestionsParams,
  { rejectValue: string }
>(
  'exams/fetchTrueFalseQuestions',
  async (params, thunkAPI) => {
    try {
      const response = await axios.post<ExamQuestion[]>('/exams/true_false', params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch true/false questions');
    }
  }
);

export const fetchFillInBlankQuestions = createAsyncThunk<
  ExamQuestion[],
  FetchQuestionsParams,
  { rejectValue: string }
>(
  'exams/fetchFillInBlankQuestions',
  async (params, thunkAPI) => {
    try {
      const response = await axios.post<ExamQuestion[]>('/exams/fill_in_blank', params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch fill-in-the-blank questions');
    }
  }
);

export const fetchDescriptiveQuestions = createAsyncThunk<
  ExamQuestion[],
  FetchQuestionsParams,
  { rejectValue: string }
>(
  'exams/fetchDescriptiveQuestions',
  async (params, thunkAPI) => {
    try {
      const response = await axios.post<ExamQuestion[]>('/exams/descriptive', params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch descriptive questions');
    }
  }
);

export const fetchMixedQuestions = createAsyncThunk<
  ExamQuestion[],
  FetchQuestionsParams,
  { rejectValue: string }
>(
  'exams/fetchMixedQuestions',
  async (params, thunkAPI) => {
    try {
      const response = await axios.post<ExamQuestion[]>('/exams/mixed', params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch mixed questions');
    }
  }
);

const initialState: ExamsObjectiveState = {
  questions: [],
  status: 'idle',
  error: null,
};

const examsObjectiveSlice = createSlice({
  name: 'examsObjective',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchObjectiveQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchObjectiveQuestions.fulfilled, (state, action: PayloadAction<ExamQuestion[]>) => {
        state.status = 'succeeded';
        state.questions = action.payload;
      })
      .addCase(fetchObjectiveQuestions.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error';
      })
      .addCase(fetchTrueFalseQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrueFalseQuestions.fulfilled, (state, action: PayloadAction<ExamQuestion[]>) => {
        state.status = 'succeeded';
        state.questions = action.payload;
      })
      .addCase(fetchTrueFalseQuestions.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error';
      })
      .addCase(fetchFillInBlankQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFillInBlankQuestions.fulfilled, (state, action: PayloadAction<ExamQuestion[]>) => {
        state.status = 'succeeded';
        state.questions = action.payload;
      })
      .addCase(fetchFillInBlankQuestions.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error';
      })
      .addCase(fetchDescriptiveQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDescriptiveQuestions.fulfilled, (state, action: PayloadAction<ExamQuestion[]>) => {
        state.status = 'succeeded';
        state.questions = action.payload;
      })
      .addCase(fetchDescriptiveQuestions.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error';
      })
      .addCase(fetchMixedQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMixedQuestions.fulfilled, (state, action: PayloadAction<ExamQuestion[]>) => {
        state.status = 'succeeded';
        state.questions = action.payload;
      })
      .addCase(fetchMixedQuestions.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error';
      });
  },
});

export default examsObjectiveSlice.reducer;
