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

export type ExamMark = {
  examMarkId: number;

  firmId: number;
  firmName: string;

  examId: number;
  examName: string;

  studentId: number;
  studentName: string;

  grade?: string | null;
  markObtained?: number | null;
  status: boolean;

  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
};

/* =======================
   API Call
======================= */

async function getMyExamMarks(
  token: string
): Promise<ExamMark[]> {
  const res = await axiosClient.get<ApiResponse<any[]>>(
    '/api/ExamMarks/student',
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data = unwrapApiResponse(res.data);
  if (!Array.isArray(data)) return [];

  return data.map((x: any) => ({
    examMarkId: x?.examMarkId ?? x?.ExamMarkId,

    firmId: x?.firmId ?? x?.FirmId,
    firmName: x?.firmName ?? x?.FirmName ?? '',

    examId: x?.examId ?? x?.ExamId,
    examName: x?.examName ?? x?.ExamName ?? '',

    studentId: x?.studentId ?? x?.StudentId,
    studentName: x?.studentName ?? x?.StudentName ?? '',

    grade: x?.grade ?? x?.Grade ?? null,
    markObtained: x?.markObtained ?? x?.MarkObtained ?? null,
    status: x?.status ?? x?.Status ?? false,

    isDeleted: x?.isDeleted ?? x?.IsDeleted ?? false,
    createdAt: x?.createdAt ?? x?.CreatedAt,
    updatedAt: x?.updatedAt ?? x?.UpdatedAt,
  }));
}

/* =======================
   Thunk
======================= */

export const fetchMyExamMarks = createAsyncThunk<
  ExamMark[],
  void,
  { state: RootState; rejectValue: string }
>(
  'examMarks/fetchMyExamMarks',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) return rejectWithValue('Token missing');

      return await getMyExamMarks(token);
    } catch (e: any) {
      return rejectWithValue(
        e?.message || 'Failed to load exam marks'
      );
    }
  }
);
