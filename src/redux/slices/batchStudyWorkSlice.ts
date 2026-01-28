import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBatchStudyWorks,
  createBatchStudyWork,
} from '../thunks/batchStudyWorkThunks';
import { BatchStudyWork } from '../types/batchStudyWorkTypes';

interface BatchStudyWorkState {
  list: BatchStudyWork[];
  loading: boolean;
  error: string | null;

  // Create modal related
  createLoading: boolean;
  createSuccess: boolean;
}

const initialState: BatchStudyWorkState = {
  list: [],
  loading: false,
  error: null,
  createLoading: false,
  createSuccess: false,
};

const batchStudyWorkSlice = createSlice({
  name: 'batchStudyWorks',
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.createLoading = false;
      state.createSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ================= FETCH =================
      .addCase(fetchBatchStudyWorks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBatchStudyWorks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload; // ✅ thunk returns array directly
      })
      .addCase(fetchBatchStudyWorks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch batch study works';
      })

      // ================= CREATE =================
      .addCase(createBatchStudyWork.pending, (state) => {
        state.createLoading = true;
        state.createSuccess = false;
        state.error = null;
      })
      .addCase(createBatchStudyWork.fulfilled, (state, action) => {
        state.createLoading = false;
        state.createSuccess = true;

        // ✅ thunk returns created object directly
        state.list.unshift(action.payload);
      })
      .addCase(createBatchStudyWork.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload ?? 'Failed to create batch study work';
      });
  },
});

export const { resetCreateState } = batchStudyWorkSlice.actions;
export default batchStudyWorkSlice.reducer;
