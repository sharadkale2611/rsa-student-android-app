import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Card, Title, Paragraph, Chip } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchStudentBatchAssignments } from '../../redux/thunks/studentAssignmentsThunks';
import { styles } from './styles';


export default function StudentAssignmentsScreen() {
  const dispatch = useAppDispatch();

  const studentAssignments =
    useAppSelector((state) => state.studentAssignments) ?? {
      list: [],
      loading: false,
      error: null,
    };

  const { list, loading, error } = studentAssignments;

  useEffect(() => {
    dispatch(fetchStudentBatchAssignments());
  }, []);

  // 🔄 Loading
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.helperText}>Loading assignments...</Text>
      </View>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // 📭 Empty state
  if (list.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.helperText}>No assignments found</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      data={list}
      keyExtractor={(item) =>
        item.studentBatchAssignmentId.toString()
      }
      renderItem={({ item }) => (
        <Card style={styles.card} elevation={3}>
          <Card.Content>
            {/* Student Name */}
            <Title style={styles.studentName}>
              {item.studentName || 'N/A'}
            </Title>

            {/* Batch */}
            <Paragraph style={styles.batchText}>
              Batch Code: {item.batchCode || '-'}
            </Paragraph>

            {/* Assignment Type */}
            <View style={styles.chipRow}>
              <Chip icon="file-document-outline" style={styles.chip}>
                {item.assignmentType}
              </Chip>
            </View>
          </Card.Content>
        </Card>
      )}
    />
  );
}
