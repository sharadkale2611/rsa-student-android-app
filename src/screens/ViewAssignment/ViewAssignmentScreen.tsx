import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';

const ViewAssignmentsScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Text variant="titleMedium">Maths Assignment</Text>
        <Text>Chapter 5 – Algebra</Text>
        <Text>Due Date: 12 Oct</Text>
      </Card>

      <Card style={styles.card}>
        <Text variant="titleMedium">Science Assignment</Text>
        <Text>Physics – Motion</Text>
        <Text>Due Date: 15 Oct</Text>
      </Card>
    </ScrollView>
  );
};

export default ViewAssignmentsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 18,
  },
});
