import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import Config from 'react-native-config';

interface FetchArgs {
  userId: number;
  firmId: number;
}

const API_BASE = Config.API_URL;

export const fetchStudentProfile = createAsyncThunk(
  'student/fetchProfile',
  async ({ userId, firmId }: FetchArgs, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const url = `${API_BASE}/api/students/by-user/${userId}?firmId=${firmId}`;

      console.log("CALLING URL:", url);

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const err = await res.text();
        return rejectWithValue(err);
      }

      const json = await res.json();
      console.log("CALLING:", json.data);
      return json.data;


        } catch (error: any) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);
