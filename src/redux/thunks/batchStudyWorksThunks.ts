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

export type BatchStudyWorkAttachment = {
  batchStudyWorkAttachementId: number;
  filePath: string;
};

export type BatchStudyWork = {
  batchStudyWorkId: number;
  workType: string;
  assignedBy: number;
  assignedByName: string;

  batchId?: number | null;
  batchCode?: string | null;

  moduleName?: string | null;
  courseName?: string | null;

  workTitle: string;
  workDescription?: string | null;
  expectedCompletionDate?: string | null;

  isActive: boolean;
  isDeleted: boolean;

  createdAt?: string;
  updatedAt?: string;

  attachments: BatchStudyWorkAttachment[];
};

/* =======================
   API Call
======================= */

async function getMyBatchStudyWorks(
  token: string
): Promise<BatchStudyWork[]> {
  const res = await axiosClient.get<ApiResponse<any[]>>(
    '/api/BatchStudyWorks/student',
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data = unwrapApiResponse(res.data);
  if (!Array.isArray(data)) return [];

  return data.map((x: any) => ({
    batchStudyWorkId:
      x?.batchStudyWorkId ?? x?.BatchStudyWorkId,

    workType: x?.workType ?? x?.WorkType,
    assignedBy: x?.assignedBy ?? x?.AssignedBy,
    assignedByName:
      x?.assignedByName ?? x?.AssignedByName ?? '',

    batchId: x?.batchId ?? x?.BatchId ?? null,
    batchCode: x?.batchCode ?? x?.BatchCode ?? null,

    moduleName: x?.moduleName ?? x?.ModuleName ?? null,
    courseName: x?.courseName ?? x?.CourseName ?? null,

    workTitle: x?.workTitle ?? x?.WorkTitle ?? '',
    workDescription:
      x?.workDescription ?? x?.WorkDescription ?? null,

    expectedCompletionDate:
      x?.expectedCompletionDate ??
      x?.ExpectedCompletionDate ??
      null,

    isActive: x?.isActive ?? x?.IsActive ?? false,
    isDeleted: x?.isDeleted ?? x?.IsDeleted ?? false,

    createdAt: x?.createdAt ?? x?.CreatedAt,
    updatedAt: x?.updatedAt ?? x?.UpdatedAt,

    attachments: Array.isArray(x?.attachments ?? x?.Attachments)
      ? (x.attachments ?? x.Attachments).map((a: any) => ({
          batchStudyWorkAttachementId:
            a?.batchStudyWorkAttachementId ??
            a?.BatchStudyWorkAttachementId,
          filePath: a?.filePath ?? a?.FilePath,
        }))
      : [],
  }));
}

/* =======================
   Thunk
======================= */

export const fetchMyBatchStudyWorks = createAsyncThunk<
  BatchStudyWork[],
  void,
  { state: RootState; rejectValue: string }
>(
  'batchStudyWorks/fetchMyBatchStudyWorks',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) return rejectWithValue('Token missing');

      return await getMyBatchStudyWorks(token);
    } catch (e: any) {
      return rejectWithValue(
        e?.message || 'Failed to load batch study works'
      );
    }
  }
);
