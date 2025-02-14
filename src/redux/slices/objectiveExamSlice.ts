import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExamQuestion {
  id: string;
  text: string;
  options: string[];
  marks: number;
  correct_answer: { option_index: number }; // ✅ Correct answer index
}

interface ExamDataState {
  examId: string | null;
  examTitle: string | null;
  questions: ExamQuestion[];
  userAnswers: Record<string, string>;
  score: number | null;
  totalMarks: number | null; // ✅ Added totalMarks
  status: "idle" | "submitted";
}

const initialState: ExamDataState = {
  examId: null,
  examTitle: null,
  questions: [],
  userAnswers: {},
  score: null,
  totalMarks: null, // ✅ Initialize totalMarks
  status: "idle",
};

const examDataSlice = createSlice({
  name: "examData",
  initialState,
  reducers: {
    setExamData: (
      state,
      action: PayloadAction<{ examId: string; examTitle: string; questions: ExamQuestion[] }>
    ) => {
      state.examId = action.payload.examId;
      state.examTitle = action.payload.examTitle;
      state.questions = action.payload.questions;
      state.userAnswers = {};
      state.score = null;
      state.totalMarks = action.payload.questions.reduce((sum, q) => sum + q.marks, 0); // ✅ Calculate total marks
      state.status = "idle";
    },
    selectAnswer: (state, action: PayloadAction<{ questionId: string; answer: string }>) => {
      state.userAnswers[action.payload.questionId] = action.payload.answer;
    },
    submitExam: (state) => {
      let totalScore = 0;

      state.questions.forEach((q) => {
        const userAnswer = state.userAnswers[q.id];
        const correctOption = q.options[q.correct_answer.option_index]; // ✅ Correct answer

        if (userAnswer && userAnswer === correctOption) { // ✅ Ensure user selected an answer
          totalScore += q.marks; // ✅ Add marks only for correct answers
        }
      });

      state.score = totalScore;
      state.status = "submitted";
    },

    resetExam: (state) => {
      state.userAnswers = {};
      state.score = null;
      state.totalMarks = null; // ✅ Reset totalMarks
      state.status = "idle";
    },
  },
});

export const { setExamData, selectAnswer, submitExam, resetExam } = examDataSlice.actions;
export default examDataSlice.reducer;
