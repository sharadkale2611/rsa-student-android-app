import { createSlice } from '@reduxjs/toolkit';
import {
  StudentBatchCounts,
  StudentMonthlyAttendance,
  fetchStudentDashboardData,
} from '../thunks/dashboardThunks';

type StudentDashboardState = {
  batchCounts: StudentBatchCounts;
  monthlyAttendance: StudentMonthlyAttendance;
  loading: boolean;
  error: string | null;
};

const initialState: StudentDashboardState = {
  batchCounts: {
    totalBatches: 0,
    todaysBatches: 0,
  },
  monthlyAttendance: {
    month: '',
    totalMarkedSessions: 0,
    presentSessions: 0,
    percentage: 0,
  },
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'studentDashboard',
  initialState,
  reducers: {
    clearStudentDashboard: (state) => {
      state.batchCounts = {
        totalBatches: 0,
        todaysBatches: 0,
      };
      state.monthlyAttendance = {
        month: '',
        totalMarkedSessions: 0,
        presentSessions: 0,
        percentage: 0,
      };
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.batchCounts = action.payload.batchCounts;
        state.monthlyAttendance = action.payload.monthlyAttendance;
      })
      .addCase(fetchStudentDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export const { clearStudentDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
