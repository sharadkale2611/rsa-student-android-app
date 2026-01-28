import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginStudent } from '../thunks/authThunks';
import { AuthState, User } from '../types/AuthTypes';
import { changePasswordThunk } from '../thunks/changePasswordThunks';

const initialState: AuthState = {
    isLoggedIn: false,
    token: null,
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginStudent.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })



            // ChangePasswordSlice
            .addCase(changePasswordThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changePasswordThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(changePasswordThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

            
    },

    
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
