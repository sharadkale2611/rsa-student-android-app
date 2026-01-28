import axios from "axios";
import { Batch } from "../types/BatchTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import Config from "react-native-config";

const API_BASE = Config.API_URL;


export const fetchBatchesByStaff = createAsyncThunk<Batch[], number>(
  "batches/fetchByStaff",
  async (staffUserId, thunkAPI) => {
    try {

      const token = (thunkAPI.getState() as any).auth.token;
     

      const url = `${API_BASE}/api/Batches/GetBatchesByStaffUserId/${staffUserId}`;
      

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return res.data.data as Batch[];

    } catch (error: any) {
      
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch batches"
      );
    }
  }
);


export const fetchBatches = createAsyncThunk<
  Batch[],
  void,
  { rejectValue: string; state: RootState }
>(
  'batches/fetchAll',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) return rejectWithValue('Token missing');

      const res = await fetch(`${API_BASE}/api/Batches`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!data.success) return rejectWithValue(data.message);

      return data.data;
    } catch {
      return rejectWithValue('Network error');
    }
  }
);