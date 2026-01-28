// src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import timetableSlice from './slices/timetableSlice';
import staffSlice from './slices/profileSlice';
import batchSlice from './slices/batchSlice';
import studentAssignmentsReducer from './slices/studentAssignmentsSlice';
import batchStudyWorkReducer from './slices/batchStudyWorkSlice'
import studentSlice from './slices/studentSlice';
import attendanceSlice from './slices/attendanceSlice';
import noticeSlice from './slices/noticeSlice';
import profileSlice from './slices/profileSlice';
import dashboardSlice from './slices/dashboardSlice';


 

export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        timetable:timetableSlice,
        profile: profileSlice,
        batches: batchSlice,
        studentAssignments: studentAssignmentsReducer,
        batchStudyWorks: batchStudyWorkReducer,
        students:studentSlice,
        attendance:attendanceSlice,
        notice:noticeSlice,
        dashboard: dashboardSlice
  
    },
});
 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
