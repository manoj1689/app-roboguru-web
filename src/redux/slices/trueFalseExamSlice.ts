import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ✅ Define True/False question structure
interface TrueFalseQuestion {
  id: string;
  text: string;
  correct_answer: { value: boolean };// ✅ Correct answer is either true or false
  marks: number;
}

interface TrueFalseExamState {
  examId: string | null;
  examTitle: string | null;
  questions: TrueFalseQuestion[];
  userAnswers: Record<string, boolean | null>; // ✅ User answers are true, false, or null
  score: number | null;
  totalMarks: number | null;
  status: "idle" | "submitted";
}

const initialState: TrueFalseExamState = {
  examId: null,
  examTitle: null,
  questions: [],
  userAnswers: {},
  score: null,
  totalMarks: null,
  status: "idle",
};

const trueFalseExamSlice = createSlice({
  name: "trueFalseExam",
  initialState,
  reducers: {
    setTrueFalseExamData: (
      state,
      action: PayloadAction<{ examId: string; examTitle: string; questions: TrueFalseQuestion[] }>
    ) => {
      state.examId = action.payload.examId;
      state.examTitle = action.payload.examTitle;
      state.questions = action.payload.questions;
      state.userAnswers = {};
      state.score = null;
      state.totalMarks = action.payload.questions.reduce((sum, q) => sum + q.marks, 0); // ✅ Calculate total marks
      state.status = "idle";
    },

    selectTrueFalseAnswer: (state, action: PayloadAction<{ questionId: string; answer: boolean }>) => {
      state.userAnswers[action.payload.questionId] = action.payload.answer;
    },

    submitTrueFalseExam: (state) => {
      let totalScore = 0;

      state.questions.forEach((q) => {
        const userAnswer = state.userAnswers[q.id];

        if (userAnswer !== null && userAnswer === q.correct_answer.value) { // ✅ Compare user answer to correct answer
          totalScore += q.marks; // ✅ Add marks for correct answers
        }
      });

      state.score = totalScore;
      state.status = "submitted";
    },

    resetTrueFalseExam: (state) => {
      state.userAnswers = {};
      state.score = null;
      state.totalMarks = null;
      state.status = "idle";
    },
  },
});

export const { setTrueFalseExamData, selectTrueFalseAnswer, submitTrueFalseExam, resetTrueFalseExam } = trueFalseExamSlice.actions;
export default trueFalseExamSlice.reducer;
