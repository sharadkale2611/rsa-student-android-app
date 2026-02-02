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

export type StudentFee = {
    studentPaymentId: number;
    studentEnrollmentId: number;

    installmentCount?: number | null;
    installmentAmount?: number | null;
    amountPaid?: number | null;

    installmentDate?: string | null;
    paidDate?: string | null;

    paymentMode?: string | null;
    transactionId?: string | null;
    screenshot?: string | null;

    status?: string | null;

    studentName: string;

    courseId: number;
    courseName: string;

    createdAt?: string;
    updatedAt?: string;
    updatedBy?: number | null;

    isDeleted: boolean;
};

/* =======================
   API Call
======================= */

async function getMyFees(token: string): Promise<StudentFee[]> {
    const res = await axiosClient.get<ApiResponse<any[]>>(
        '/api/StudentPayments/student',
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );

    const data = unwrapApiResponse(res.data);
    if (!Array.isArray(data)) return [];


    return data.map((x: any): StudentFee => ({
        studentPaymentId: x.studentPaymentId,
        studentEnrollmentId: x.studentEnrollmentId,

        installmentCount: x.installmentCount,
        installmentAmount: x.amount,
        amountPaid: x.amountPaid,

        installmentDate: x.date,
        paidDate: x.paidDate ?? null,

        paymentMode: x.paymentMode ?? null,
        transactionId: x.transactionId ?? null,
        screenshot: x.screenshot ?? null,

        status: x.status,

        studentName: x.studentName,

        courseId: x.courseId,
        courseName: x.courseName,

        createdAt: x.createdAt,
        updatedAt: x.updatedAt,
        updatedBy: x.updatedBy ?? null,

        isDeleted: x.isDeleted,
    }));


}

/* =======================
   Thunk
======================= */

export const fetchMyFees = createAsyncThunk<
    StudentFee[],
    void,
    { state: RootState; rejectValue: string }
>(
    'fees/fetchMyFees',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            if (!token) return rejectWithValue('Token missing');

            return await getMyFees(token);
        } catch (e: any) {
            return rejectWithValue(
                e?.message || 'Failed to load fees'
            );
        }
    }
);
