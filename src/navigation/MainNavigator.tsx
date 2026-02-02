import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

/* ---------------- SCREENS ---------------- */
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import TimetableScreen from '../screens/Timetable/TimetableScreen';
import TodayTimeTableScreen from '../screens/TodayTimeTable/TodayTimeTableScreen';
import WeeklyTimetableScreen from '../screens/WeeklyTimetable/WeeklyTimetable';
import MyBatchesScreen from '../screens/MyBatches/MyBatchesScreen';
import BatchStudentsScreen from '../screens/BatchStudents/BatchStudentsScreen';
import BatchStudyWorksScreen from '../screens/BatchStudyWorks/BatchStudyWorksScreen';
import PendingAttendanceScreen from '../screens/PendingAttendance/PendingAttendanceScreen';
import PendingAssignmentScreen from '../screens/PendingAssignment/PendingAssignmentScreen';
import TeacherProfileScreen from '../screens/StudentProfileScreen/StudentProfileScreen';
import ChangePasswordScreen from '../screens/ChangePassword/ChangePasswordScreen';
import SendNoticeScreen from '../screens/Notice/SendNoticeScreen';
import NoticeBoardScreen from '../screens/NoticeBoard/NoticeBoardScreen';
import SubjectAttendanceScreen from '../screens/SubjectAttendance/SubjectAttendanceScreen';
import ExamsScreen from '../screens/Exams/ExamsScreen'; 


/* ---------------- APP BAR ---------------- */
import StackAppBar from './StackAppBar';
import AttendanceScreen from '../screens/Attendance/AttendanceScreen';
import AttendanceSummaryScreen from '../screens/AttendanceSummary/AttendanceSummaryScreen';
import AttendanceNotificationsScreen from '../screens/AttendanceNotification/AttendanceNotificationsScreen';
import AssignmentScreen from '../screens/Assignment/AssignmentScreen';
import ViewAssignmentsScreen from '../screens/ViewAssignment/ViewAssignmentScreen';
import UploadAssignmentScreen from '../screens/UploadAssignment/UploadAssignmentScreen';
import AssignmentMarksScreen from '../screens/AssignmentMark/AssignmentMarksScreen';
import StudentProfileScreen from '../screens/StudentProfileScreen/StudentProfileScreen';
import ViewAssignmentScreen from '../screens/ViewAssignment/ViewAssignmentScreen';
import FeesScreen from '../screens/Fees/FeesScreen';

/* ---------------- NAVIGATORS ---------------- */
const Tab = createBottomTabNavigator();
const DashboardStack = createNativeStackNavigator();
const TimetableStack = createNativeStackNavigator();
const MyBatchesStack = createNativeStackNavigator();
const AttendanceStack = createNativeStackNavigator();
const AssignmentStack = createNativeStackNavigator();


/* ---------------- TAB HIDE HELPER ---------------- */
const shouldHideTabBar = (route: any) => {
  const routeName =
    getFocusedRouteNameFromRoute(route) ?? 'DashboardMain';

  return [
    'StudentProfile',
    'ChangePassword',
    'BatchStudents',
    'BatchStudyWorks',
    'PendingAttendance',
    'PendingAssignment',
    'SendNotice',
    'NoticeBoard',
    'TodayTimeTable',
    'WeeklyTimeTable',
  ].includes(routeName);
};

/* ================= DASHBOARD STACK ================= */
const DashboardStackNavigator = () => (
  <DashboardStack.Navigator
    screenOptions={{
      header: (props) => <StackAppBar {...props} />,
    }}
  >
    <DashboardStack.Screen
      name="DashboardMain"
      component={DashboardScreen}
    />
    <DashboardStack.Screen name="StudentProfile" component={StudentProfileScreen} />
    <DashboardStack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    <DashboardStack.Screen name="PendingAttendance" component={PendingAttendanceScreen} />
    <DashboardStack.Screen name="PendingAssignment" component={PendingAssignmentScreen} />
    <DashboardStack.Screen name="SendNotice" component={SendNoticeScreen} />
    <DashboardStack.Screen name="NoticeBoard" component={NoticeBoardScreen} />
    <DashboardStack.Screen name="Exams" component={ExamsScreen} />
    <DashboardStack.Screen name="ViewAssignments" component={ViewAssignmentScreen} />
    <DashboardStack.Screen name="Fees" component={FeesScreen} />
  </DashboardStack.Navigator>
);

/* ================= TIMETABLE STACK ================= */
const TimetableStackNavigator = () => (
  <TimetableStack.Navigator
    screenOptions={{
      header: (props) => <StackAppBar {...props} />,
    }}
  >
    <TimetableStack.Screen
      name="TimetableMain"
      component={TimetableScreen}
    />
    <TimetableStack.Screen
      name="TodayTimeTable"
      component={TodayTimeTableScreen}
    />
    <TimetableStack.Screen
      name="WeeklyTimeTable"
      component={WeeklyTimetableScreen}
    />
  </TimetableStack.Navigator>
);

/* ================= MY BATCHES STACK ================= */
// const MyBatchesStackNavigator = () => (
//   <MyBatchesStack.Navigator
//     screenOptions={{
//       header: (props) => <StackAppBar {...props} />,
//     }}
//   >
//     <MyBatchesStack.Screen
//       name="MyBatchesMain"
//       component={MyBatchesScreen}
//     />
//     <MyBatchesStack.Screen
//       name="BatchStudents"
//       component={BatchStudentsScreen}
//     />
//     <MyBatchesStack.Screen
//       name="BatchStudyWorks"
//       component={BatchStudyWorksScreen}
//     />
//   </MyBatchesStack.Navigator>
// );

const AttendanceStackNavigator = () => (
  <AttendanceStack.Navigator
    screenOptions={{
      header: (props) => <StackAppBar {...props} />,
    }}
  >
    <AttendanceStack.Screen
  name="AttendanceMain"
  component={AttendanceScreen}
/>
<AttendanceStack.Screen
  name="AttendanceSummary"
  component={AttendanceSummaryScreen}
/>
<AttendanceStack.Screen
      name="SubjectAttendance"
      component={SubjectAttendanceScreen}
    />
<AttendanceStack.Screen
  name="AttendanceNotifications"
  component={AttendanceNotificationsScreen}
/>
  </AttendanceStack.Navigator>
);


const AssignmentStackNavigator = () => (
  <AssignmentStack.Navigator
    initialRouteName="AssignmentMain"
    screenOptions={{
      header: (props) => <StackAppBar {...props} />,
    }}
  >
    <AssignmentStack.Screen
      name="AssignmentMain"
      component={AssignmentScreen}
    />
    <AssignmentStack.Screen
      name="ViewAssignments"
      component={ViewAssignmentsScreen}
    />
    <AssignmentStack.Screen
      name="UploadAssignment"
      component={UploadAssignmentScreen}
    />
    <AssignmentStack.Screen
      name="AssignmentMarks"
      component={AssignmentMarksScreen}
    />
  </AssignmentStack.Navigator>
);


/* ================= MAIN TAB ================= */
const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // 🔥 MUST BE FALSE
        tabBarStyle: shouldHideTabBar(route)
          ? { display: 'none' }
          : { height: 60, paddingBottom: 6 },

        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',

        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'home-outline';

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Timetable') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          // } else if (route.name === 'Batches') {
          //   iconName = focused ? 'book' : 'book-outline';
          }
          else if (route.name === 'Attendance') {
            iconName = focused
              ? 'checkmark-circle'
              : 'checkmark-circle-outline'
          }

          return (
            <Ionicons name={iconName} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardStackNavigator} />
      <Tab.Screen name="Timetable" component={TimetableStackNavigator} />
      {/* <Tab.Screen name="Batches" component={MyBatchesStackNavigator} /> */}
      <Tab.Screen name="Attendance" component={AttendanceStackNavigator} />
      <Tab.Screen name="Assignement" component={AssignmentStackNavigator} />


    </Tab.Navigator>
  );
};

export default MainNavigator;
