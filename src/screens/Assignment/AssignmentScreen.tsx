import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import DashboardCard from '../Dashboard/DashboardCard';

const AssignmentScreen: React.FC = () => {
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
          Assignments
        </Text>
        <Text
          variant="bodyMedium"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          Manage your assignments
        </Text>
      </Card>

      <View style={styles.cardWrapper}>
        <DashboardCard
          title="View Assignments"
          subtitle="See all assigned work"
          icon="clipboard-text"
          onPress={() => navigation.navigate('ViewAssignments')}
        />
      </View>

      <View style={styles.cardWrapper}>
        <DashboardCard
          title="Upload Assignment Work"
          subtitle="Submit your assignment"
          icon="upload"
          onPress={() => navigation.navigate('UploadAssignment')}
        />
      </View>

      <View style={styles.cardWrapper}>
        <DashboardCard
          title="Marks & Remarks"
          subtitle="View marks and feedback"
          icon="star-circle"
          onPress={() => navigation.navigate('AssignmentMarks')}
        />
      </View>
    </ScrollView>
  );
};

export default AssignmentScreen;

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
