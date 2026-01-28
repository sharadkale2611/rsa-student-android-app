import { createAsyncThunk } from "@reduxjs/toolkit";
import Config from "react-native-config";

interface CreateNoticePayload {
  title: string;
  description: string;
  createdFor: "BATCH" | "STUDENT";
  batchId?: number;
  studentId?: number;
  token: string;
  createdBy?: string;
}

const API_BASE = Config.API_URL;


export const createNoticeThunk = createAsyncThunk<
  any,                     // ✅ success return type
  CreateNoticePayload,     // ✅ argument type
  { rejectValue: string }  // ✅ reject type
>(
  "notices/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/api/Notices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${payload.token}`,
        },
        body: JSON.stringify({
          title: payload.title,
          description: payload.description,
          createdFor: payload.createdFor,
          batchId: payload.batchId,
          studentId: payload.studentId,
          createdBy: payload.createdBy,
        }),
      });

      const json = await res.json();

      if (!json.success) {
        return rejectWithValue(json.message);
      }

      return json.data;
    } catch {
      return rejectWithValue("Failed to send notice");
    }
  }
);
