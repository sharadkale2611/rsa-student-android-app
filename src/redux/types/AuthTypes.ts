// src/redux/types/AuthTypes.ts

export interface User {
   userId: number;
  username: string;
  email: string;
  roles: string[];
  firmId: number;
  firmName: string;
  firmCode: string;
}

export interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
    user: User | null;
    loading: boolean;
    error: string | null;
}
