import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, useTheme, ProgressBar } from 'react-native-paper';

const AttendanceSummaryScreen: React.FC = () => {
  const theme = useTheme();

  const totalAttendance = 85; // later from API
  const presentDays = 45;
  const absentDays = 8;

  return (
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
        </Text>
      </Card>

      {/* ATTENDANCE PERCENTAGE */}
      <Card style={styles.card} mode="outlined">
        <Text variant="titleMedium">Overall Attendance</Text>
        <Text style={styles.percentage}>{totalAttendance}%</Text>

        <ProgressBar
          progress={totalAttendance / 100}
          color={theme.colors.primary}
          style={styles.progress}
        />
      </Card>

      {/* DETAILS */}
      <View style={styles.row}>
        <Card style={styles.smallCard} mode="outlined">
          <Text variant="titleMedium">{presentDays}</Text>
          <Text>Present Days</Text>
        </Card>

        <Card style={styles.smallCard} mode="outlined">
          <Text variant="titleMedium">{absentDays}</Text>
          <Text>Absent Days</Text>
        </Card>
      </View>
    </ScrollView>
  );
};

export default AttendanceSummaryScreen;

const styles = StyleSheet.create({
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
  },
  smallCard: {
    flex: 1,
    padding: 16,
    borderRadius: 18,
    alignItems: 'center',
  },
});
