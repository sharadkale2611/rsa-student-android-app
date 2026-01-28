import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

export const shouldHideTabBar = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route);

    const hiddenRoutes = [
        'TeacherProfile',
        'ChangePassword',
        'BatchStudents',
        'BatchStudyWorks',
        'SendNotice',
        'PendingAttendance',
        'PendingAssignment',
    ];

    return hiddenRoutes.includes(routeName ?? '');
};
