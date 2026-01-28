// src > screens > Dashbaord > DashboardScreen.tsx

import React, { useState, useEffect } from 'react';
import { Image, View, ScrollView } from 'react-native';
import {
  Text,
  Button,
  useTheme,
  Appbar,
  Card,
  Divider,
  Avatar,
  List,
  Chip,
  Portal,
} from 'react-native-paper';

import { useNavigation, useNavigationState } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/slices/authSlice';
import { fetchStudentDashboardData } from '../../redux/thunks/dashboardThunks';

import styles from './styles';
import Logo from './../../assets/images/logo.png';
import {
  DashboardStackParamList,
  RootStackParamList,
} from '../../navigation/types';

import screenTitles from '../../navigation/screenTitles';
import { getFocusedRouteNameFromRoute, useRoute } from '@react-navigation/native';


type DashboardNavProp =
  NativeStackNavigationProp<DashboardStackParamList>;
type RootNavProp =
  NativeStackNavigationProp<RootStackParamList>;

const DashboardScreen: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const dashboardNavigation = useNavigation<DashboardNavProp>();
  const rootNavigation = useNavigation<RootNavProp>();

  const { user } = useAppSelector(state => state.auth);

  const { batchCounts, monthlyAttendance, error } =
    useAppSelector(state => state.dashboard);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    dispatch(fetchStudentDashboardData())
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    rootNavigation.replace('Auth');
  };

  const currentRouteName = useNavigationState(
    state => state.routes[state.index]?.name
  );

  const route = useRoute();

  const focusedRouteName =
    getFocusedRouteNameFromRoute(route) ?? 'DashboardMain';

  const showDashboardActions =
    focusedRouteName === 'DashboardMain';

  const screenConfig = screenTitles[focusedRouteName];

  // const isDashboard = currentRouteName === 'DashboardMain';
 
  const showBackButton =
    currentRouteName === 'StudentProfile' ||
    currentRouteName === 'ChangePassword';

  // ---------------- Skeleton Card ----------------
  const SkeletonCard = () => (
    <Card style={{ marginBottom: 16 }}>
      <Card.Content>
        <View
          style={{
            height: 16,
            width: '60%',
            backgroundColor: theme.colors.surfaceVariant,
            borderRadius: 4,
            marginBottom: 12,
          }}
        />
        <View
          style={{
            height: 28,
            width: '30%',
            backgroundColor: theme.colors.surfaceVariant,
            borderRadius: 4,
          }}
        />
      </Card.Content>
    </Card>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* ---------------- APPBAR ---------------- */}
      <Portal>
        <Appbar.Header elevated style={{ backgroundColor: theme.colors.primary }}>
          {showBackButton && (
            <Appbar.BackAction
              onPress={() => dashboardNavigation.goBack()}
              color={theme.colors.onPrimary}
            />
          )}

          <Appbar.Content
            title={
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={Logo}
                  style={{
                    width: 28,
                    height: 28,
                    marginRight: 8,
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={{
                    color: theme.colors.onPrimary,
                    fontSize: 18,
                    fontWeight: '600',
                  }}
                >
                  {screenConfig?.title ?? 'Rev. Sci. Academy'}
                </Text>
              </View>
            }
            subtitle={screenConfig?.subtitle}
            subtitleStyle={{
              color: theme.colors.onPrimary,
              opacity: 0.85,
            }}
          />


          
          {showDashboardActions && (
           <>
              <Appbar.Action
                icon="account-circle-outline"
                onPress={() =>
                  dashboardNavigation.navigate('StudentProfile' as never)
                }
                color={theme.colors.onPrimary}
              />           
            <Appbar.Action
              icon="lock-reset"
              onPress={() =>
                dashboardNavigation.navigate('ChangePassword' as never)
              }
              color="#fff"
              />
              <Appbar.Action
                icon="logout"
                onPress={handleLogout}
                color={theme.colors.onPrimary}
              />

            </> 
          )}
        </Appbar.Header>
      </Portal>

      {/* ---------------- CONTENT ---------------- */}
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.colors.background, flexGrow: 1 },
        ]}
      >
        {/* Welcome */}
        <Text style={[styles.title, { color: theme.colors.onBackground,marginBottom: 12,  }]}>
          Welcome {` `} 
          <Text
            style={{
              textTransform: 'capitalize',
              color: theme.colors.primary,
              fontWeight: '600',
            }}
          >
            {user?.username || 'Guest'}!
          </Text>
        </Text>

        {/* ---------------- DASHBOARD BODY ---------------- */}
        {/* ---------------- DASHBOARD BODY ---------------- */}
{loading ? (
  <>
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
  </>
) : (
  <>
    {/* -------- Today’s Classes -------- */}
    <Card style={{ marginBottom: 16 }}>
      <Card.Content style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Avatar.Icon
          icon="book-outline"
          size={48}
          style={{ backgroundColor: theme.colors.primaryContainer }}
          color={theme.colors.primary}
        />
        <View style={{ marginLeft: 16 }}>
          <Text variant="labelMedium">Today’s Classes</Text>
          <Text variant="headlineMedium">{batchCounts?.todaysBatches ?? 0}</Text>
        </View>
      </Card.Content>
    </Card>

    {/* -------- Attendance % -------- */}
    <Card style={{ marginBottom: 16 }}>
      <Card.Title
        title="Attendance"
        left={(props) => (
          <Avatar.Icon
            {...props}
            icon="clipboard-check-outline"
            style={{ backgroundColor: theme.colors.primaryContainer }}
          />
        )}
      />
      <Card.Content>
        <Text
          style={{
            fontSize: 32,
            fontWeight: '700',
            color: theme.colors.primary,
            marginBottom: 8,
          }}
        >
          {Math.max(0, Math.min(100, monthlyAttendance?.percentage ?? 0))}%
        </Text>

        <View
          style={{
            height: 6,
            borderRadius: 4,
            backgroundColor: theme.colors.surfaceVariant,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              width: `${Math.max(0, Math.min(100, monthlyAttendance?.percentage ?? 0))}%`,
              height: '100%',
              backgroundColor: theme.colors.primary,
            }}
          />
        </View>

        {!!error && (
          <Text style={{ color: theme.colors.error, marginTop: 8 }}>
            {error}
          </Text>
        )}
      </Card.Content>
    </Card>

    {/* -------- Quick Links -------- */}
    <Card>
      <Card.Title
        title="Quick Links"
        left={(props) => (
          <Avatar.Icon
            {...props}
            icon="link-variant"
            style={{ backgroundColor: theme.colors.primaryContainer }}
          />
        )}
      />
      <Card.Content>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}
        >
          <Button
            mode="contained"
            style={{ flex: 1, marginRight: 6 }}
            onPress={() =>
              dashboardNavigation.navigate('Assignments' as never)
            }
          >
            Assignments
          </Button>

          <Button
            mode="contained"
            style={{ flex: 1, marginLeft: 6 }}
          >
            Fees
          </Button>
        </View>

        <Button
          mode="contained"
          icon="file-document-outline"
        >
          Exams
        </Button>
      </Card.Content>
    </Card>
  </>
)}
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;
