import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosApi from "../../services/api";

// Define the base structure of an exam question
interface BaseExamQuestion {
    id: string;
    text: string;
    type: string;
    marks: number;
    options?: string[];
    correct_answer?: any;
}

// Define the structure of the response's data field
interface ExamQuestionsData {
    chapter_name: string;
    class_name: string;
    exam_id: string;
    exam_title: string;
    generation_time: number;
    input_tokens: number;
    output_tokens: number;
    questions: {
        descriptive: BaseExamQuestion[];
        fill_in_blank: BaseExamQuestion[];
        objective: BaseExamQuestion[];
        true_false: BaseExamQuestion[];
    };
    subject_name: string;
    topic_name: string;
    total_tokens: number;
}

// Define the full API response structure
interface MixedQuestionsResponse {
    success: boolean;
    message: string;
    data: ExamQuestionsData;
}

// Define the state structure for the Redux slice
interface MixedExamState {
    response: MixedQuestionsResponse | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Define parameters for fetching questions
interface FetchMixedQuestionsParams {
    class_name: string;
    subject_name: string;
    chapter_name: string;
    topic_name: string;
    num_questions: number;
    difficulty: string;
    question_distribution: {
        objective: number;
        true_false: number;
        descriptive: number;
    };
}

export const fetchMixedQuestions = createAsyncThunk<
    MixedQuestionsResponse,
    FetchMixedQuestionsParams,
    { rejectValue: string }
>(
    'exams/fetchMixedQuestions',
    async (params, thunkAPI) => {
        try {
            const response = await axiosApi.post<MixedQuestionsResponse>('/exams/mixed', params);
            console.log("response mixed question",response.data)
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch mixed questions");
        }
    }
);

// Create Redux slice
const mixedExamSlice = createSlice({
    name: 'mixedExam',
    initialState: {
        response: null,
        status: 'idle',
        error: null,
    } as MixedExamState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMixedQuestions.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchMixedQuestions.fulfilled, (state, action: PayloadAction<MixedQuestionsResponse>) => {
                state.status = 'succeeded';
                state.response = action.payload;
            })
            .addCase(fetchMixedQuestions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to load questions';
            });
    }
});

export default mixedExamSlice.reducer;
