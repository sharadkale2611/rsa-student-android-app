import { createSlice } from '@reduxjs/toolkit';
import {
  Exam,
  ExamTypeFilter,
  fetchMyExams,
} from '../thunks/examsThunks';

type ExamsState = {
  items: Exam[];
  loading: boolean;
  error: string | null;
  filter: ExamTypeFilter;
};

const initialState: ExamsState = {
  items: [],
  loading: false,
  error: null,
  filter: 'all',
};

const examsSlice = createSlice({
  name: 'exams',
  initialState,
  reducers: {
    clearExams: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
      state.filter = 'all';
    },
    setExamFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyExams.pending, (state, action) => {
        state.loading = true;
        state.error = null;

        // keep UI filter in sync with fetch
        state.filter = action.meta.arg?.type ?? 'all';
      })
      .addCase(fetchMyExams.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchMyExams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export const { clearExams, setExamFilter } = examsSlice.actions;
export default examsSlice.reducer;
