import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import Config from "react-native-config";

const API_BASE = Config.API_URL;

export const fetchStudentsByBatch = createAsyncThunk(
  "students/fetchByBatch",
  async (batchId: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const url = `${API_BASE}/api/Batches/BatchIdWiseStudentsList/${batchId}`;

      console.log("CALLING STUDENT URL:", url);
      console.log("TOKEN:", token);

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`, 
          Accept: "*/*",
        },
      });

      return response.data.data; 

    } catch (error: any) {
      console.log("🔥 API ERROR:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Failed to load students");
    }
  }
);