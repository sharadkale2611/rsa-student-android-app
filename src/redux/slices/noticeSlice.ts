import { createSlice } from "@reduxjs/toolkit";
import { createNoticeThunk } from "../thunks/noticeThunks";
import {
  fetchNoticesThunk,
  updateNoticeThunk,
} from "../thunks/fetchnoticeThunks";

interface NoticeState {
  notice: any[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: NoticeState = {
  notice: [],
  loading: false,
  error: null,
  success: false,
};

const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    resetNoticeState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ======================
         CREATE NOTICE
      ====================== */
      .addCase(createNoticeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createNoticeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // Add newly created notice at top
        if (action.payload) {
          state.notice.unshift(action.payload);
        }
      })
      .addCase(createNoticeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* ======================
         FETCH NOTICES
      ====================== */
      .addCase(fetchNoticesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNoticesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.notice = action.payload;
      })
      .addCase(fetchNoticesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* ======================
         UPDATE NOTICE
      ====================== */
      .addCase(updateNoticeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNoticeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const index = state.notice.findIndex(
          (n) => n.noticeId === action.payload.noticeId
        );

        if (index !== -1) {
          state.notice[index] = action.payload;
        }
      })
      .addCase(updateNoticeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetNoticeState } = noticeSlice.actions;
export default noticeSlice.reducer;
