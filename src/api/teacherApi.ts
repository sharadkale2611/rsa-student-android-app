// src/api/teacherApi.ts
import axiosClient from './axiosClient';
import { User } from '../redux/types/AuthTypes';

// export interface LoginPayload {
//     email: string;
//     password: string;
// }

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export const teacherApi = {
    login: async (payload: LoginPayload): Promise<LoginResponse> => {
        const response = await axiosClient.post<LoginResponse>('/login', payload);
        return response.data;
    },
};
