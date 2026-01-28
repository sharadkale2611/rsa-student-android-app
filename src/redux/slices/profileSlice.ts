import { createSlice } from '@reduxjs/toolkit';
import { StudentState } from '../types/StudentTypes';
import { fetchStudentProfile } from '../thunks/profileThunks';

const initialState: StudentState = {
  profile: null,
  loading: false,
  error: null,
};

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    clearStudentProfile(state) {
      state.profile = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(fetchStudentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to load profile';
      });
  },
});

export const { clearStudentProfile } = staffSlice.actions;
export default staffSlice.reducer;
