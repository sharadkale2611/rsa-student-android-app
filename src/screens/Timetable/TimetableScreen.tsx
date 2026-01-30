import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, useTheme, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import DashboardCard from '../Dashboard/DashboardCard';

const TimetableScreen: React.FC = () => {
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
      <Card style={styles.headerCard} mode="elevated">
        <Text variant="titleLarge" style={{ fontWeight: '700' }}>
          Classes & Timetable
        </Text>
        <Text
          variant="bodyMedium"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          View daily & weekly class schedules
        </Text>
      </Card>

      <View style={styles.cardWrapper}>
        <DashboardCard
          title="Today's Timetable"
          subtitle="View today’s classes"
          icon="calendar-today"
          onPress={() => navigation.navigate('Timetable', {
            screen: 'TodayTimeTable',
          })
          }
        />
      </View>

      <View style={styles.cardWrapper}>
        <DashboardCard
          title="Weekly Timetable"
          subtitle="Full week overview"
          icon="calendar-week"
          onPress={() => navigation.navigate('WeeklyTimeTable' as never)}
        />
      </View>


    </ScrollView>
  );
};

export default TimetableScreen;

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
    // flexDirection: 'row',
    // gap: 16,
    marginBottom: 16,
  },
});
