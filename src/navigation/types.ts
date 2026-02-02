// src/navigation/types.ts

// ---------- Auth Stack ----------
export type AuthStackParamList = {
    Login: undefined;
};

// ---------- Dashboard Stack ----------
export type DashboardStackParamList = {
    DashboardMain: undefined;
    MyBatches: undefined;
    BatchStudents: { batchId: number } | undefined;
    PendingAttendance: undefined;
    PendingAssignment: undefined;
    TeacherProfile: undefined;
    ChangePassword: undefined;
    BatchStudyWorks: undefined;
    SendNotice: undefined;
    NoticeBoard: undefined; // ✅ ADD THIS
    Exams: undefined;
    ViewAssignments: undefined;
    Fees: undefined;
};

// ---------- Attendance Stack ----------
export type AttendanceStackParamList = {
    AttendanceMain: undefined;
    MarkAttendance: undefined;
    AttendanceSummary: undefined;
    AttendanceCorrection: undefined;
};

// ---------- Timetable Stack ----------
export type TimetableStackParamList = {
    TimeTableMain: undefined;
    TodayTimeTable: undefined;
    WeeklyTimeTable: undefined;
};

// ---------- Assignment Stack ----------
export type AssignmentStackParamList = {
    AssignmentMain: undefined;
};

// ---------- Bottom Tabs ----------
export type BottomTabParamList = {
    Dashboard: undefined;
    Attendance: undefined;
    Timetable: undefined;
    Assignments: undefined;
    NoticeBoard: undefined;
};

// ---------- Root Stack ----------
export type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
};
