import { createSlice } from "@reduxjs/toolkit";
import { fetchStudentsByBatch } from "../thunks/studentThunks";

interface StudentState {
  students: any[];
  loading: boolean;
  error: string | null;
}

const initialState: StudentState = {
  students: [],
  loading: false,
  error: null,
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    // ✅ ADD THIS
    clearStudents: (state) => {
      state.students = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentsByBatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentsByBatch.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudentsByBatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// ✅ EXPORT ACTION
export const { clearStudents } = studentSlice.actions;

export default studentSlice.reducer;
