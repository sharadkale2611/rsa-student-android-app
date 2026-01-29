import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import { RootState } from '../store';

/* =======================
   Common API Types
======================= */
type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
  error?: string;
};

function unwrapApiResponse<T>(response: ApiResponse<T>): T {
  if (!response?.success) {
    throw new Error(response?.error || response?.message || 'Request failed');
  }
  return response.data;
}

/* =======================
   Domain Types
======================= */

export type SubjectAttendanceItem = {
  moduleId: number;
  moduleName: string;
  courseName: string | null;
  batchName: string;
  staffName: string;

  totalMarkedSessions: number;
  presentSessions: number;
  absentSessions: number;
  leaveSessions: number;
  lateSessions: number;
  percentage: number;
};

export type SubjectAttendanceResponse = {
  from: string;
  to: string;
  items: SubjectAttendanceItem[];
};

/* =======================
   API Call
======================= */

async function getSubjectWiseAttendance(
  token: string,
  from?: string,
  to?: string
): Promise<SubjectAttendanceResponse> {
  const res = await axiosClient.get<ApiResponse<any>>(
    '/api/Attendance/student/module-wise',
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        from,
        to,
      },
    }
  );

  const data = unwrapApiResponse(res.data);

  return {
    from: data?.from,
    to: data?.to,
    items: Array.isArray(data?.items)
      ? data.items.map((x: any) => ({
          moduleId: x?.moduleId ?? x?.ModuleId,
          moduleName: x?.moduleName ?? x?.ModuleName ?? '',
          courseName: x?.courseName ?? x?.CourseName ?? null,
          batchName: x?.batchName ?? x?.BatchName ?? '',
          staffName: x?.staffName ?? x?.StaffName ?? '',

          totalMarkedSessions:
            x?.totalMarkedSessions ?? x?.TotalMarkedSessions ?? 0,
          presentSessions:
            x?.presentSessions ?? x?.PresentSessions ?? 0,
          absentSessions:
            x?.absentSessions ?? x?.AbsentSessions ?? 0,
          leaveSessions:
            x?.leaveSessions ?? x?.LeaveSessions ?? 0,
          lateSessions:
            x?.lateSessions ?? x?.LateSessions ?? 0,
          percentage: x?.percentage ?? x?.Percentage ?? 0,
        }))
      : [],
  };
}

/* =======================
   Thunk
======================= */

export const fetchSubjectAttendance = createAsyncThunk<
  SubjectAttendanceResponse,
  { from?: string; to?: string } | void,
  { state: RootState; rejectValue: string }
>(
  'subjectAttendance/fetchSubjectAttendance',
  async (args, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) return rejectWithValue('Token missing');

      const from = args?.from;
      const to = args?.to;

      return await getSubjectWiseAttendance(token, from, to);
    } catch (e: any) {
      return rejectWithValue(
        e?.message || 'Failed to load subject-wise attendance'
      );
    }
  }
);
