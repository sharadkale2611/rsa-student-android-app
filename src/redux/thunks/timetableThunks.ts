import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import Config from "react-native-config";

const API_BASE = Config.API_URL;

export interface TimeTableItem {
  batchDurationInHr: any;
  expectedDateTime: string;
  trainerName: string;
  classRoomName: string;
  batchName: string;
  moduleName: string;
  courseName: string;
  status: string;
}


export const fetchTodayTimeTable = createAsyncThunk<
  TimeTableItem[],       
  void,                  
  { rejectValue: string; state: RootState }
>(
  "timetable/fetchToday",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const url = `${API_BASE}/api/TimeTables/student?type=today`;

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,  
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        return rejectWithValue("Invalid server response");
      }

      const json = await res.json();
      console.log("TODAY TIMETABLE:", json);

      return json.data ?? [];
    } catch (err) {
      return rejectWithValue("Network error");
    }
  }
);


export const fetchWeeklyTimeTable = createAsyncThunk<
  TimeTableItem[],
  void,
  { rejectValue: string; state: RootState }
>(
  "timetable/fetchWeekly",
  async (_, { rejectWithValue, getState }) => {
    try {
       const state = getState() as RootState;
       const token = state.auth.token;

       const url = `${API_BASE}/api/TimeTables/student?type=week`;

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,  
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        return rejectWithValue("Invalid server response");
      }

      const json = await res.json();
      console.log("WEEKLY TIMETABLE:", json);

      return json.data ?? [];
    } catch (err) {
      return rejectWithValue("Network error");
    }
  }
);
