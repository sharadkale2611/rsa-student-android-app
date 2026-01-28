import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Appbar, Text, Card, useTheme, ProgressBar } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchStudentDashboardData } from '../../redux/thunks/dashboardThunks';
import { useNavigation } from '@react-navigation/native';

const AttendanceSummaryScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const { monthlyAttendance, loading, error } = useAppSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchStudentDashboardData());
  }, [dispatch]);

  const percentage = Math.max(
    0,
    Math.min(100, monthlyAttendance?.percentage ?? 0)
  );
  const presentDays = monthlyAttendance?.presentSessions ?? 0;
  const absentDays = monthlyAttendance?.absentSessions ?? 0;
  const leaveDays = monthlyAttendance?.leaveSessions ?? 0;
  const lateDays = monthlyAttendance?.lateSessions ?? 0;

  return (
    <View style={[styles.screen, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header elevated style={{ backgroundColor: theme.colors.surface  }}>
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          color={theme.colors.primary }
        />
        <Appbar.Content
          title="Attendance Summary"
          titleStyle={{ fontWeight: '700' }}
        />
      </Appbar.Header>

      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}
      >
        {/* HEADER */}
        <Card style={styles.headerCard} mode="elevated">
          <Text variant="titleLarge" style={styles.title}>
            My Attendance Summary
          </Text>
          <Text
            variant="bodyMedium"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            Overview of your attendance
            {monthlyAttendance?.month ? ` (${monthlyAttendance.month})` : ''}
          </Text>
        </Card>

      {/* ATTENDANCE PERCENTAGE */}
      <Card style={styles.card} mode="elevated">
        <Text variant="titleMedium">Overall Attendance</Text>
        <Text style={styles.percentage}>{percentage}%</Text>

        <ProgressBar
          progress={percentage / 100}
          color={theme.colors.primary}
          style={styles.progress}
        />

        {loading && (
          <Text style={{ marginTop: 8, color: theme.colors.onSurfaceVariant }}>
            Loading...
          </Text>
        )}

        {!!error && (
          <Text style={{ marginTop: 8, color: theme.colors.error }}>
            {error}
          </Text>
        )}
      </Card>

        {/* DETAILS */}
        <View style={styles.row}>
          <Card style={styles.smallCard} mode="elevated">
            <Text variant="headlineSmall" style={{ fontWeight: '700' }}>
              {presentDays}
            </Text>
            <Text style={{ color: theme.colors.onSurfaceVariant }}>
              Present Days
            </Text>
          </Card>

          <Card style={styles.smallCard} mode="elevated">
            <Text variant="headlineSmall" style={{ fontWeight: '700' }}>
              {absentDays}
            </Text>
            <Text style={{ color: theme.colors.onSurfaceVariant }}>
              Absent Days
            </Text>
          </Card>
        </View>

        <View style={styles.row}>
          <Card style={styles.smallCard} mode="elevated">
            <Text variant="headlineSmall" style={{ fontWeight: '700' }}>
              {leaveDays}
            </Text>
            <Text style={{ color: theme.colors.onSurfaceVariant }}>
              Leave Days
            </Text>
          </Card>

          <Card style={styles.smallCard} mode="elevated">
            <Text variant="headlineSmall" style={{ fontWeight: '700' }}>
              {lateDays}
            </Text>
            <Text style={{ color: theme.colors.onSurfaceVariant }}>
              Late Days
            </Text>
          </Card>
        </View>

      </ScrollView>
    </View>
  );
};

export default AttendanceSummaryScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  headerCard: {
    padding: 18,
    borderRadius: 22,
    marginBottom: 22,
  },
  title: {
    fontWeight: '700',
  },
  card: {
    padding: 18,
    borderRadius: 18,
    marginBottom: 20,
  },
  percentage: {
    fontSize: 36,
    fontWeight: '700',
    marginVertical: 12,
  },
  progress: {
    height: 8,
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  smallCard: {
    flex: 1,
    padding: 16,
    borderRadius: 18,
    alignItems: 'center',
  },
});
