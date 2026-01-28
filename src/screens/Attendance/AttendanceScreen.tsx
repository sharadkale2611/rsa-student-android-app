import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, useTheme, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import DashboardCard from '../Dashboard/DashboardCard';

const AttendanceScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      {/* Header */}
      {/* <Card style={styles.headerCard} mode="elevated">
        <Text variant="titleLarge" style={{ fontWeight: '700' }}>
          Attendance
        </Text>
        <Text
          variant="bodyMedium"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          Track your attendance details
        </Text>
      </Card> */}

      {/* CARDS (VERTICAL) */}
      <View style={styles.cardWrapper}>
        <DashboardCard
          title="My Attendance Summary"
          subtitle="Overall attendance details"
          icon="check-circle"
          onPress={() => navigation.navigate('AttendanceSummary')}
        />
      </View>

      <View style={styles.cardWrapper}>
        <DashboardCard
          title="Subject-wise Attendance"
          subtitle="View subject attendance"
          icon="chart-bar"
          onPress={() => navigation.navigate('SubjectAttendance')}
        />
      </View>

      <View style={styles.cardWrapper}>
        <DashboardCard
          title="Attendance Notifications"
          subtitle="Alerts & updates"
          icon="bell"
          onPress={() => navigation.navigate('AttendanceNotifications')}
        />
      </View>
    </ScrollView>
  );
};

export default AttendanceScreen;

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
  cardWrapper: {
    marginBottom: 16,
  },
});
