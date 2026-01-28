import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';

const AssignmentMarksScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Text variant="titleMedium">Maths Assignment</Text>
        <Text>Marks: 18 / 20</Text>
        <Text>Remark: Good work 👍</Text>
      </Card>
    </ScrollView>
  );
};

export default AssignmentMarksScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    padding: 18,
    borderRadius: 18,
  },
});
