import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';

const UploadAssignmentScreen: React.FC = () => {
  const handleUpload = () => {
    console.log('Upload pressed');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Text variant="titleMedium">Upload Assignment</Text>
        <Text>Select file and submit</Text>

        <Button
          mode="contained"
          style={styles.button}
          onPress={handleUpload}
        >
          Upload File
        </Button>
      </Card>
    </ScrollView>
  );
};

export default UploadAssignmentScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    padding: 18,
    borderRadius: 18,
  },
  button: {
    marginTop: 16,
  },
});
