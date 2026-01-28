import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';

interface Props {
  trainerName: string;
  classroomName: string;
  startTime: string;
  endTime: string;
  duration: string;
  batchName: string;
  moduleName: string;
  courseName: string;
}

export default function TodayTimetableCard({
  trainerName,
  classroomName,
  startTime,
  endTime,
  duration,
  batchName,
  moduleName,
  courseName,
}: Props) {
  const theme = useTheme();

  return (
    <Card style={styles.card} mode="elevated">
      <View style={styles.row}>
        {/* LEFT */}
        <View style={styles.leftBox}>
          <Text style={styles.trainer}>
            {trainerName} ({classroomName})
          </Text>

          <Text style={[styles.time, { color: theme.colors.primary }]}>
            {startTime} – {endTime}
          </Text>

          <Text style={styles.duration}>{duration}</Text>
        </View>

        {/* RIGHT */}
        <View style={styles.rightBox}>
          <Text
            style={[
              styles.batch,
              { color: theme.colors.primary },
            ]}
          >
            #{batchName}
          </Text>

          <Text style={styles.module}>{moduleName}</Text>
          <Text style={styles.course}>{courseName}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 20,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  leftBox: {
    width: '55%',
  },

  trainer: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },

  time: {
    fontSize: 18,
    fontWeight: '700',
  },

  duration: {
    opacity: 0.6,
    marginTop: 2,
  },

  rightBox: {
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  batch: {
    fontSize: 18,
    fontWeight: '700',
  },

  module: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 6,
  },

  course: {
    fontSize: 13,
    opacity: 0.6,
    textAlign: 'center',
  },
});
