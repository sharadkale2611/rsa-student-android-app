import { createAsyncThunk } from '@reduxjs/toolkit';
import { BatchStudyWork } from '../types/batchStudyWorkTypes';
import { RootState } from '../store';
import Config from 'react-native-config';

const API_BASE = Config.API_URL;

export const fetchBatchStudyWorks = createAsyncThunk<
  BatchStudyWork[],
  void,
  { rejectValue: string; state: RootState }
>(
  'batchStudyWorks/fetchAll',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      if (!token) {
        return rejectWithValue('Authentication token missing');
      }

      const res = await fetch(
        `${API_BASE}/api/BatchStudyWorks`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        return rejectWithValue(errorText || 'Failed to fetch study works');
      }

      const data = await res.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data as BatchStudyWork[];
    } catch (error) {
      return rejectWithValue('Network error');
    }
  }
);




export interface CreateBatchStudyWorkPayload {
  workType: string;
  batchId?: number | null;
  workTitle: string;
  workDescription?: string;
  expectedCompletionDate?: string | null;
  isActive: boolean;
}


export const createBatchStudyWork = createAsyncThunk<
  BatchStudyWork,
  CreateBatchStudyWorkPayload,
  { rejectValue: string; state: RootState }
>(
  'batchStudyWorks/create',
  async (payload, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      if (!token) {
        return rejectWithValue('Authentication token missing');
      }

      const res = await fetch(
        `${API_BASE}/api/BatchStudyWorks`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        return rejectWithValue(errorText || 'Failed to create study work');
      }

      const data = await res.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data as BatchStudyWork;
    } catch (error) {
      return rejectWithValue('Network error');
    }
  }
);