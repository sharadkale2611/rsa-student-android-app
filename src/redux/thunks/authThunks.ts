// src/redux/thunks/authThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginPayload } from '../../api/teacherApi';
import { User } from '../types/AuthTypes';
import Config from 'react-native-config';

interface LoginResult {
  token: string;
  user: User;
}

const API_BASE = Config.API_URL;

export const loginStudent = createAsyncThunk<
  LoginResult,
  LoginPayload,
  { rejectValue: string }
>(
  'auth/loginStudent',
  async (payload, { rejectWithValue }) => {
    try {    
      const res = await fetch(`${API_BASE}/api/Auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: payload.username.trim().toLowerCase(),
          password: payload.password.trim()
        })
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.log("SERVER ERROR RESPONSE:", errorText);

        try {
          const parsed = JSON.parse(errorText);

          // 1️⃣ If error is a string
          if (typeof parsed.error === "string") {
            return rejectWithValue(parsed.error);
          }

          // 2️⃣ If message is a string
          if (typeof parsed.message === "string") {
            return rejectWithValue(parsed.message);
          }

          // 3️⃣ If errors object (validation errors)
          if (parsed.errors && typeof parsed.errors === "object") {
            const firstKey = Object.keys(parsed.errors)[0]; // Password / Email / etc.
            const firstMessage = parsed.errors[firstKey][0];
            return rejectWithValue(firstMessage);
          }

          // 4️⃣ Fallback
          return rejectWithValue("Something went wrong");
        } catch (err) {
          // Backend returned plain text, not JSON
          return rejectWithValue(errorText || "Something went wrong");
        }
      }

      const data = await res.json();
      console.log("SERVER DATA:", data);

//      if (!data.roles?.includes("Student")) 
//       {
//   return rejectWithValue("Only Students are allowed to login");
// }


      return {
        token: data.accessToken,
        user: {
          userId: data.userId,
          username: data.username,
          email: data.email,
          roles: data.roles,
          firmId: data.firmId,
          firmName: data.firmName,
          firmCode: data.firmCode,
        }
      };

    } catch (error) {
      // Improved: extract message from Error object
      if (error instanceof Error) {
        return rejectWithValue(error.message + ` ${API_BASE}/api/Auth/login` || "Unknown network error");
      }
      // fallback
      return rejectWithValue(String(error) + ` ${API_BASE}/api/Auth/login` || "Unknown network error");
    }
  }
);
