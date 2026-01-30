import { createSlice } from '@reduxjs/toolkit';
import {
  BatchStudyWork,
  fetchMyBatchStudyWorks,
} from '../thunks/batchStudyWorksThunks';

type BatchStudyWorksState = {
  items: BatchStudyWork[];
  loading: boolean;
  error: string | null;
};

const initialState: BatchStudyWorksState = {
  items: [],
  loading: false,
  error: null,
};

const batchStudyWorksSlice = createSlice({
  name: 'batchStudyWorks',
  initialState,
  reducers: {
    clearBatchStudyWorks: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyBatchStudyWorks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyBatchStudyWorks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchMyBatchStudyWorks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export const { clearBatchStudyWorks } = batchStudyWorksSlice.actions;
export default batchStudyWorksSlice.reducer;
