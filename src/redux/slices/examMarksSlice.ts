import { createSlice } from '@reduxjs/toolkit';
import {
  ExamMark,
  fetchMyExamMarks,
} from '../thunks/examMarksThunks';

type ExamMarksState = {
  items: ExamMark[];
  loading: boolean;
  error: string | null;
};

const initialState: ExamMarksState = {
  items: [],
  loading: false,
  error: null,
};

const examMarksSlice = createSlice({
  name: 'examMarks',
  initialState,
  reducers: {
    clearExamMarks: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyExamMarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyExamMarks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchMyExamMarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export const { clearExamMarks } = examMarksSlice.actions;
export default examMarksSlice.reducer;
