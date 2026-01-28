import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, useTheme, Chip } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AttendanceNotificationsScreen: React.FC = () => {
  const theme = useTheme();

  // Later this will come from API
  const notifications = [
    {
      id: 1,
      title: 'Low Attendance Warning',
      message: 'Your attendance in Mathematics is below 75%',
      type: 'warning',
      date: 'Today',
    },
    {
      id: 2,
      title: 'Attendance Marked',
      message: 'Your attendance for Physics class has been marked',
      type: 'info',
      date: 'Yesterday',
    },
    {
      id: 3,
      title: 'Good Attendance',
      message: 'Great job! Your overall attendance is above 85%',
      type: 'success',
      date: '2 days ago',
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return 'alert-circle';
      case 'success':
        return 'check-circle';
      default:
        return 'information';
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'warning':
        return theme.colors.error;
      case 'success':
        return 'green';
      default:
        return theme.colors.primary;
    }
  };

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
          Attendance Notifications
        </Text>
        <Text
          variant="bodyMedium"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          Important attendance updates
        </Text>
      </Card>

      {/* NOTIFICATION LIST */}
      {notifications.map((item) => (
        <Card key={item.id} style={styles.notificationCard} mode="outlined">
          <View style={styles.row}>
            <MaterialCommunityIcons
              name={getIcon(item.type)}
              size={28}
              color={getColor(item.type)}
            />

            <View style={styles.textContainer}>
              <Text variant="titleMedium">{item.title}</Text>
              <Text variant="bodyMedium">{item.message}</Text>

              <Chip style={styles.chip} compact>
                {item.date}
              </Chip>
            </View>
          </View>
        </Card>
      ))}
    </ScrollView>
  );
};

export default AttendanceNotificationsScreen;

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
  notificationCard: {
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    gap: 14,
  },
  textContainer: {
    flex: 1,
  },
  chip: {
    alignSelf: 'flex-start',
    marginTop: 6,
  },
});
