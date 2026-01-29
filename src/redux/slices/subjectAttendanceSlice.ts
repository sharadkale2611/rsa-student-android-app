import { createSlice } from '@reduxjs/toolkit';
import {
  SubjectAttendanceItem,
  SubjectAttendanceResponse,
  fetchSubjectAttendance,
} from '../thunks/subjectAttendanceThunks';

type SubjectAttendanceState = {
  from: string | null;
  to: string | null;
  items: SubjectAttendanceItem[];
  loading: boolean;
  error: string | null;
};

const initialState: SubjectAttendanceState = {
  from: null,
  to: null,
  items: [],
  loading: false,
  error: null,
};

const subjectAttendanceSlice = createSlice({
  name: 'subjectAttendance',
  initialState,
  reducers: {
    clearSubjectAttendance: (state) => {
      state.from = null;
      state.to = null;
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjectAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjectAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.from = action.payload.from;
        state.to = action.payload.to;
        state.items = Array.isArray(action.payload.items)
          ? action.payload.items
          : [];
      })
      .addCase(fetchSubjectAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export const { clearSubjectAttendance } = subjectAttendanceSlice.actions;
export default subjectAttendanceSlice.reducer;
