import { createSlice } from '@reduxjs/toolkit';
import { fetchStudentBatchAssignments } from '../thunks/studentAssignmentsThunks';
import { StudentBatchAssignment } from '../types/studentAssignmentTypes';

interface StudentAssignmentsState {
  list: StudentBatchAssignment[];
  loading: boolean;
  error: string | null;
}

const initialState: StudentAssignmentsState = {
  list: [],
  loading: false,
  error: null,
};

const studentAssignmentsSlice = createSlice({
  name: 'studentAssignments',
  initialState,
  reducers: {
    clearStudentAssignments: (state) => {
      state.list = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ⏳ Pending
      .addCase(fetchStudentBatchAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ✅ Success
      .addCase(fetchStudentBatchAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      // ❌ Error
      .addCase(fetchStudentBatchAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { clearStudentAssignments } = studentAssignmentsSlice.actions;

export default studentAssignmentsSlice.reducer;
