import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchMyFees, StudentFee } from '../thunks/feesThunks';

/* =======================
   State Type
======================= */

type FeesState = {
  items: StudentFee[];
  loading: boolean;
  error: string | null;
};

/* =======================
   Initial State
======================= */

const initialState: FeesState = {
  items: [],
  loading: false,
  error: null,
};

/* =======================
   Slice
======================= */

const feesSlice = createSlice({
  name: 'fees',
  initialState,
  reducers: {
    clearFees(state) {
      state.items = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder

      /* -------- FETCH MY FEES -------- */
      .addCase(fetchMyFees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMyFees.fulfilled,
        (state, action: PayloadAction<StudentFee[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchMyFees.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || 'Failed to load fees';
      });
  },
});

/* =======================
   Exports
======================= */

export const { clearFees } = feesSlice.actions;

export default feesSlice.reducer;
