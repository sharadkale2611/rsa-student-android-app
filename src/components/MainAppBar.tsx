import React from 'react';
import { Appbar } from 'react-native-paper';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import screenTitles from '../navigation/screenTitles';

const ROOT_ROUTES = [
    'DashboardMain',
    'TimetableMain',
    'MyBatchesMain',
];

const MainAppBar = ({ navigation, route }: any) => {
    const routeName =
        getFocusedRouteNameFromRoute(route) ?? route.name;

    const config = screenTitles[routeName];

    const isRoot = ROOT_ROUTES.includes(routeName);

    return (
        <Appbar.Header elevated>
            <Appbar.Content
                title={config?.title ?? 'Rev. Sci. Academy'}
                subtitle={config?.subtitle}
            />

            {isRoot && (
                <>
                    <Appbar.Action
                        icon="account-circle-outline"
                        onPress={() => navigation.navigate('TeacherProfile')}
                    />
                    <Appbar.Action
                        icon="lock-reset"
                        onPress={() => navigation.navigate('ChangePassword')}
                    />
                    <Appbar.Action
                        icon="logout"
                        onPress={() => {
                            // dispatch(logout())
                        }}
                    />
                </>
            )}
        </Appbar.Header>
    );
};

export default MainAppBar;
