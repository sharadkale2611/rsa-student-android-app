import { createSlice } from "@reduxjs/toolkit";
import {
  createAttendanceSession,
  fetchAttendanceBySessionId,
  fetchAttendanceSessionByBatch,
  submitAttendanceStatus,
} from "../thunks/attendanceThunks";

interface AttendanceState {
  list: any[];
  loading: boolean;
  error: string | null;
  sessionCreated: boolean;

  submitLoading: boolean;
  submitError: string | null;
  sessionId: number | null;

}

const initialState: AttendanceState = {
  list: [],
  loading: false,
  error: null,
  sessionCreated: false,

  submitLoading: false,
  submitError: null,
  sessionId: null
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    clearAttendance: (state) => {
      state.list = [];
      state.sessionCreated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ============================
         CREATE ATTENDANCE SESSION
         ============================ */
      .addCase(createAttendanceSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAttendanceSession.fulfilled, (state) => {
        state.loading = false;
        state.sessionCreated = true;
      })
      .addCase(createAttendanceSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* ============================
         FETCH ATTENDANCE BY SESSION
         ============================ */
      .addCase(fetchAttendanceBySessionId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceBySessionId.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAttendanceBySessionId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* ============================
         SUBMIT ATTENDANCE STATUS
         ============================ */
      .addCase(submitAttendanceStatus.pending, (state) => {
        state.submitLoading = true;
        state.submitError = null;
      })
      .addCase(submitAttendanceStatus.fulfilled, (state) => {
        state.submitLoading = false;
      })
      .addCase(submitAttendanceStatus.rejected, (state, action) => {
        state.submitLoading = false;
        state.submitError = action.payload as string;
      })
      .addCase(fetchAttendanceSessionByBatch.fulfilled, (state, action) => {
      const sessionId = action.payload?.data?.sessionId;
      state.sessionId = sessionId ?? null;
    });
      
      ;
  },
});

export const { clearAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;
