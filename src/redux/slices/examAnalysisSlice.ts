import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ✅ Define ExamQuestion interface to support all question types
interface ExamQuestion {
  id: string;
  text: string;
  type: string;
  marks: number;
  options?: string[];
  correct_answer?: any;
}

// ✅ Define ExamDataState interface
interface ExamDataState {
  examId: string | null;
  examTitle: string | null;
  questions: ExamQuestion[];
  userAnswers: Record<string, string>;
  score: number | null;
  totalMarks: number | null;
  status: "idle" | "submitted";
}

// ✅ Initial state
const initialState: ExamDataState = {
  examId: null,
  examTitle: null,
  questions: [],
  userAnswers: {},
  score: null,
  totalMarks: null,
  status: "idle",
};

const examDataSlice = createSlice({
  name: "examData",
  initialState,
  reducers: {
    // ✅ Set Exam Data (Flatten questions)
    setExamData: (
      state,
      action: PayloadAction<{
        examId: string;
        examTitle: string;
        questions: { [key: string]: ExamQuestion[] }; // Object with question types as keys
      }>
    ) => {
      state.examId = action.payload.examId;
      state.examTitle = action.payload.examTitle;

      // 🔥 Flatten the questions object into an array
      state.questions = Object.values(action.payload.questions).flat();

      // ✅ Reset user answers and calculate total marks
      state.userAnswers = {};
      state.score = null;
      state.totalMarks = state.questions.reduce((sum, q) => sum + q.marks, 0);
      state.status = "idle";
    },

    // ✅ Store user's answer
    selectAnswer: (state, action: PayloadAction<{ questionId: string; answer: string }>) => {
      state.userAnswers[action.payload.questionId] = action.payload.answer;
    },

    // ✅ Submit Exam and Calculate Score
    submitExam: (state) => {
      let totalScore = 0;

      state.questions.forEach((q) => {
        const userAnswer = state.userAnswers[q.id];

        if (q.type === "objective" || q.type === "true_false") {
          // ✅ Check if user's selected option matches the correct answer
          if (q.correct_answer.option_index !== undefined && userAnswer === q.options?.[q.correct_answer.option_index]) {
            totalScore += q.marks;
          }
        } else if (q.type === "descriptive" || q.type === "fill_in_blank") {
          // ✅ Check if user's answer matches the correct text answer
          if (q.correct_answer.text && userAnswer?.toLowerCase() === q.correct_answer.text.toLowerCase()) {
            totalScore += q.marks;
          }
        }
      });

      state.score = totalScore;
      state.status = "submitted";
    },

    // ✅ Reset Exam Data
    resetExam: (state) => {
      state.userAnswers = {};
      state.score = null;
      state.totalMarks = null;
      state.status = "idle";
    },
  },
});

// ✅ Export actions
export const { setExamData, selectAnswer, submitExam, resetExam } = examDataSlice.actions;

// ✅ Export reducer
export default examDataSlice.reducer;

