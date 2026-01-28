import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import Config from "react-native-config";

const API_BASE = Config.API_URL;

/* =========================================================
   CREATE ATTENDANCE SESSION
   ========================================================= */
export const createAttendanceSession = createAsyncThunk(
  "attendance/createSession",
  async (
    {
      batchId,
      staffId,
      moduleId,
    }: {
      batchId: number;
      staffId: number;
      moduleId: number | null;
    },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;


      const url = `${API_BASE}/api/AttendanceSession`;

      const body = {
        batchId,
        staffId: Number(staffId),
        moduleId,
      };

      console.log("TOKEN:", token);
      console.log("POST SESSION BODY:", body);

      const response = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("SESSION RESPONSE:", response.data);

      return response.data;
    } catch (error: any) {
      console.log("SESSION API ERROR:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || "Failed to create attendance session"
      );
    }
  }
);

/* =========================================================
   FETCH ATTENDANCE BY SESSION ID
   ========================================================= */
export const fetchAttendanceBySessionId = createAsyncThunk(
  "attendance/fetchBySession",
  async (sessionId: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const url = `${API_BASE}/api/Attendance/by-session/${sessionId}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("RAW RESPONSE:", response.data);

      // 🔥 SAFE RETURN (IMPORTANT)
      return response.data?.data ?? [];
    } catch (error: any) {
      return rejectWithValue("Failed to fetch attendance");
    }
  }
);


/* =========================================================
   SUBMIT ATTENDANCE STATUS (BULK UPDATE)
   ========================================================= */
export const submitAttendanceStatus = createAsyncThunk(
  "attendance/submitStatus",
  async (
    {
      sessionId,
      attendanceUpdates,
    }: {
      sessionId: number;
      attendanceUpdates: {
        attendanceId: number;
        studentId: number;
        status: string;
      }[];
    },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const url = `${API_BASE}/api/Attendance/update-status`;

      const body = {
        sessionId,
        attendanceUpdates,
      };

      console.log("SUBMIT ATTENDANCE BODY:", body);

      const response = await axios.put(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("SUBMIT ATTENDANCE RESPONSE:", response.data);

      return response.data;
    } catch (error: any) {
      console.log(
        "SUBMIT ATTENDANCE ERROR:",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data || "Failed to submit attendance"
      );
    }
  }
);


/* =========================================================
   FETCH ATTENDANCE SESSION BY BATCH & STAFF
   ========================================================= */
export const fetchAttendanceSessionByBatch = createAsyncThunk(
  "attendance/fetchSessionByBatch",
  async (
    {
      batchId,
      userId,
    }: {
      batchId: number;
      userId: number;
    },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const url = `${API_BASE}/api/AttendanceSession/${batchId}/${userId}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("FETCH SESSION RESPONSE:", response.data);

      return response.data;
    } catch (error: any) {
      console.log(
        "FETCH SESSION ERROR:",
        error.response?.data || error.message
      );
      return rejectWithValue("Failed to fetch attendance session");
    }
  }
);
