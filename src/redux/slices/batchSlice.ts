import { createSlice } from "@reduxjs/toolkit";
import { fetchBatchesByStaff, fetchBatches } from "../thunks/batchThunks";
import { Batch } from "../types/BatchTypes";

interface BatchState {
  batches: Batch[];
  loading: boolean;
  error: string | null;
}

const initialState: BatchState = {
  batches: [],
  loading: false,
  error: null,
};

const batchSlice = createSlice({
  name: "batches",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBatchesByStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBatchesByStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.batches = action.payload; // now payload is Batch[]
      })
      .addCase(fetchBatchesByStaff.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch batch data";
      })

       // ================= FETCH ALL =================
      .addCase(fetchBatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBatches.fulfilled, (state, action) => {
        state.loading = false;
        state.batches = action.payload;
      })
      .addCase(fetchBatches.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch batches";
      });
  },
});

export default batchSlice.reducer;
