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

export type Exam = {
  examId: number;

  firmId: number;
  firmName: string;

  courseId?: number | null;
  courseName?: string | null;

  moduleId: number;
  moduleName: string;

  examName: string;
  examDescription?: string | null;

  examDurationHrs?: number | null;
  examDateTime?: string | null;

  examTotalMarks?: number | null;
  examPassingMarks?: number | null;

  isActive: boolean;
  isDeleted: boolean;

  createdAt?: string;
  updatedAt?: string;
};

export type ExamTypeFilter = 'all' | 'upcoming' | 'past';

/* =======================
   API Call
======================= */

async function getMyExams(
  token: string,
  type: ExamTypeFilter
): Promise<Exam[]> {
  const res = await axiosClient.get<ApiResponse<any[]>>(
    '/api/Exams/student',
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { type },
    }
  );

  const data = unwrapApiResponse(res.data);
  if (!Array.isArray(data)) return [];

  return data.map((x: any) => ({
    examId: x?.examId ?? x?.ExamId,

    firmId: x?.firmId ?? x?.FirmId,
    firmName: x?.firmName ?? x?.FirmName ?? '',

    courseId: x?.courseId ?? x?.CourseId ?? null,
    courseName: x?.courseName ?? x?.CourseName ?? null,

    moduleId: x?.moduleId ?? x?.ModuleId,
    moduleName: x?.moduleName ?? x?.ModuleName ?? '',

    examName: x?.examName ?? x?.ExamName ?? '',
    examDescription:
      x?.examDescription ?? x?.ExamDescription ?? null,

    examDurationHrs:
      x?.examDurationHrs ?? x?.ExamDurationHrs ?? null,

    examDateTime:
      x?.examDateTime ?? x?.ExamDateTime ?? null,

    examTotalMarks:
      x?.examTotalMarks ?? x?.ExamTotalMarks ?? null,

    examPassingMarks:
      x?.examPassingMarks ?? x?.ExamPassingMarks ?? null,

    isActive: x?.isActive ?? x?.IsActive ?? false,
    isDeleted: x?.isDeleted ?? x?.IsDeleted ?? false,

    createdAt: x?.createdAt ?? x?.CreatedAt,
    updatedAt: x?.updatedAt ?? x?.UpdatedAt,
  }));
}

/* =======================
   Thunk
======================= */

export const fetchMyExams = createAsyncThunk<
  Exam[],
  { type?: ExamTypeFilter } | void,
  { state: RootState; rejectValue: string }
>(
  'exams/fetchMyExams',
  async (args, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) return rejectWithValue('Token missing');

      const type: ExamTypeFilter = args?.type ?? 'all';

      return await getMyExams(token, type);
    } catch (e: any) {
      return rejectWithValue(
        e?.message || 'Failed to load exams'
      );
    }
  }
);
