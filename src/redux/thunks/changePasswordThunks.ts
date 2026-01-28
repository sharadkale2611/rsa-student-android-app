import { createAsyncThunk } from "@reduxjs/toolkit";
  // ⭐ Use axiosClient
import type { RootState } from "../store";
import axiosClient from "../../api/axiosClient";
import Config from "react-native-config";

interface ChangePasswordPayload {
  userId: number;
  currentPassword: string;
  newPassword: string;
}

const API_BASE = Config.API_URL;

export const changePasswordThunk = createAsyncThunk(
  "auth/changePassword",
  async ({ userId, currentPassword, newPassword }: ChangePasswordPayload, thunkAPI) => {
    try {
      // Get token from Redux
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        return thunkAPI.rejectWithValue("No authentication token found.");
      }

      // ⭐ Send request using axiosClient
      const response = await axiosClient.post(
        `/api/Users/${userId}/change-password`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token attach
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.log("CHANGE PASSWORD ERROR:", error.response?.data || error.message);

      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to update password"
      );
    }
  }
);
