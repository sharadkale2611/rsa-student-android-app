import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import { RootState } from '../store';

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

export type StudentBatchCounts = {
  totalBatches: number;
  todaysBatches: number;
};

export type StudentMonthlyAttendance = {
  month: string;
  totalMarkedSessions: number;
  presentSessions: number;
  absentSessions: number;
  leaveSessions: number;
  lateSessions: number;
  percentage: number;
};

export type StudentDashboardData = {
  batchCounts: StudentBatchCounts;
  monthlyAttendance: StudentMonthlyAttendance;
};


async function getStudentBatchCounts(
  token: string
): Promise<StudentBatchCounts> {
  const res = await axiosClient.get<ApiResponse<any>>(
    '/api/DashboardData/student-batch-counts',
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const data = unwrapApiResponse(res.data);

  console.log("BATCH COUNTS DATA:", data);

  return {
    totalBatches: data?.totalBatches ?? data?.TotalBatches ?? 0,
    todaysBatches: data?.todaysBatches ?? data?.TodaysBatches ?? 0,
  };
}

async function getStudentMonthlyAttendance(
  token: string
): Promise<StudentMonthlyAttendance> {
  const res = await axiosClient.get<ApiResponse<any>>(
    '/api/DashboardData/student/monthly-attendance',
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const data = unwrapApiResponse(res.data);

  console.log("MONTHLY ATTENDANCE DATA:", data);

  return {
    month: data?.month ?? '',
    totalMarkedSessions:
      data?.totalMarkedSessions ?? data?.TotalMarkedSessions ?? 0,
    presentSessions:
      data?.presentSessions ?? data?.PresentSessions ?? 0,
    absentSessions: 
      data?.absentSessions ?? data?.AbsentSessions ?? 0,
    leaveSessions:
      data?.leaveSessions ?? data?.LeaveSessions ?? 0,
    lateSessions:
      data?.lateSessions ?? data?.LateSessions ?? 0,
    percentage: data?.percentage ?? data?.Percentage ?? 0,
  };
}

export const fetchStudentDashboardData = createAsyncThunk<
  StudentDashboardData,
  void,
  { state: RootState; rejectValue: string }
>(
  'studentDashboard/fetchStudentDashboardData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) return rejectWithValue('Token missing');

      const [batchCounts, monthlyAttendance] = await Promise.all([
        getStudentBatchCounts(token),
        getStudentMonthlyAttendance(token),
      ]);
      console.log("FETCHED DASHBOARD DATA:", { batchCounts, monthlyAttendance });

      return { batchCounts, monthlyAttendance };
    } catch (e: any) {
      return rejectWithValue(
        e?.message || 'Failed to load student dashboard data'
      );
    }
  }
);
