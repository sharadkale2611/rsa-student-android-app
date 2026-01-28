import { createAsyncThunk } from '@reduxjs/toolkit';
import { StudentBatchAssignment } from '../types/studentAssignmentTypes';
import { RootState } from '../store';
import Config from 'react-native-config';

const API_BASE = Config.API_URL;

export const fetchStudentBatchAssignments = createAsyncThunk<
  StudentBatchAssignment[],
  void,
  { rejectValue: string; state: RootState }
>(
  'studentAssignments/fetchAll',
  async (_, { rejectWithValue, getState }) => {
    try {
      // 1️⃣ Get token from Redux (same app, same login)
      const token = getState().auth.token;
      
      if (!token) {
        return rejectWithValue('Authentication token not found');
      }

      // 2️⃣ Call API (SAME pattern as login)
      const res = await fetch(
        `${API_BASE}/api/StudentBatchAssignments`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 3️⃣ Handle HTTP errors
      if (!res.ok) {
        const errorText = await res.text();
        console.log('SERVER ERROR RESPONSE:', errorText);

        try {
          const parsed = JSON.parse(errorText);

          if (typeof parsed.error === 'string') {
            return rejectWithValue(parsed.error);
          }

          if (typeof parsed.message === 'string') {
            return rejectWithValue(parsed.message);
          }

          return rejectWithValue('Failed to fetch assignments');
        } catch {
          return rejectWithValue(errorText || 'Failed to fetch assignments');
        }
      }

      // 4️⃣ Parse JSON
      const data = await res.json();
      console.log('SERVER DATA:', data);

      // 5️⃣ Validate API response shape
      if (!data.success) {
        return rejectWithValue(data.message || 'API returned failure');
      }

      // 6️⃣ Return list
      return data.data as StudentBatchAssignment[];
    } catch (error) {
      console.log('NETWORK ERROR:', error);
      return rejectWithValue('Network error');
    }
  }
);
