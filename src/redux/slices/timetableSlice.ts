import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTodayTimeTable,
  fetchWeeklyTimeTable,
  TimeTableItem,
} from "../thunks/timetableThunks";

interface TimetableState {
  today: TimeTableItem[];
  weekly: TimeTableItem[];
  loading: boolean;
  error: string | null;
}

const initialState: TimetableState = {
  today: [],
  weekly: [],
  loading: false,
  error: null,
};

const timetableSlice = createSlice({
  name: "timetable",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // ⭐ TODAY
      .addCase(fetchTodayTimeTable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTodayTimeTable.fulfilled, (state, action) => {
        state.loading = false;
        state.today = action.payload; // array of items
      })

      .addCase(fetchTodayTimeTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      })

      // ⭐ WEEKLY
      .addCase(fetchWeeklyTimeTable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchWeeklyTimeTable.fulfilled, (state, action) => {
        state.loading = false;
        state.weekly = action.payload; // array of items
      })

      .addCase(fetchWeeklyTimeTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export default timetableSlice.reducer;
