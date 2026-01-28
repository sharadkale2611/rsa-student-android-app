import { createAsyncThunk } from "@reduxjs/toolkit";
import Config from "react-native-config";

/* ================= FETCH NOTICES ================= */

interface FetchNoticesPayload {
  token: string;
}

const API_BASE = Config.API_URL;


export const fetchNoticesThunk = createAsyncThunk<
  any[],
  FetchNoticesPayload,
  { rejectValue: string }
>(
  "notices/fetchAll",
  async ({ token }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${API_BASE}/api/Notices`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await res.json();

      // ✅ return only array
      return json.data;
    } catch {
      return rejectWithValue("Failed to fetch notices");
    }
  }
);

/* ================= UPDATE NOTICE ================= */

interface UpdateNoticePayload {
  noticeId: number;
  title: string;
  description: string;
  token: string;
}

export const updateNoticeThunk = createAsyncThunk<
  any,
  UpdateNoticePayload,
  { rejectValue: string }
>(
  "notices/update",
  async (
    { noticeId, title, description, token },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(
        `${API_BASE}/api/Notices/${noticeId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
          }),
        }
      );

      const json = await res.json();

      if (!res.ok) {
        return rejectWithValue(
          json?.message || "Failed to update notice"
        );
      }

      return json.data; // ✅ updated notice
    } catch {
      return rejectWithValue("Failed to update notice");
    }
  }
);
