import React, { useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import {
  Appbar,
  Card,
  Text,
  ProgressBar,
  useTheme,
  ActivityIndicator,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchSubjectAttendance } from '../../redux/thunks/subjectAttendanceThunks';

const SubjectAttendanceScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const { items, loading, error, from, to } = useAppSelector(
    (state) => state.subjectAttendance
  );

  useEffect(() => {
    dispatch(fetchSubjectAttendance());
  }, [dispatch]);

  const renderItem = ({ item }: any) => {
    const percentage = Math.max(0, Math.min(100, item.percentage ?? 0));

    return (
      <Card style={styles.card} mode="elevated">
        {/* MODULE HEADER */}
        <View style={styles.headerRow}>
          <Text variant="titleMedium" style={styles.moduleName}>
            {item.moduleName}
          </Text>
          <Text style={styles.percentage}>{percentage}%</Text>
        </View>

        {!!item.courseName && (
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            Course: {item.courseName}
          </Text>
        )}

        <Text
          variant="bodySmall"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          Batch: {item.batchName}
        </Text>

        <Text
          variant="bodySmall"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          Staff: {item.staffName}
        </Text>

        {/* PROGRESS */}
        <ProgressBar
          progress={percentage / 100}
          color={theme.colors.primary}
          style={styles.progress}
        />

        {/* STATS */}
        <View style={styles.statsRow}>
          <Stat label="Present" value={item.presentSessions} />
          <Stat label="Absent" value={item.absentSessions} />
          <Stat label="Leave" value={item.leaveSessions} />
          <Stat label="Late" value={item.lateSessions} />
        </View>
      </Card>
    );
  };

  return (
    <>
      {/* APPBAR */}
      <Appbar.Header elevated style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.BackAction onPress={() => navigation.goBack()}
          color={theme.colors.primary}
        />
        <Appbar.Content
          title="Subject Attendance"
          titleStyle={{ fontWeight: '700' }}
          subtitle={
            from && to ? `${from}  →  ${to}` : 'Module-wise overview'
          }
        />
      </Appbar.Header>

      {/* BODY */}
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        {loading && (
          <ActivityIndicator style={{ marginTop: 24 }} />
        )}

        {!!error && (
          <Text style={{ color: theme.colors.error, marginTop: 16 }}>
            {error}
          </Text>
        )}

        {!loading && !error && (!items || items.length === 0) && (
          <View style={styles.emptyState}>
            <Text
              variant="titleMedium"
              style={{
                color: theme.colors.onSurfaceVariant,
                fontWeight: '700',
                letterSpacing: 0.5,
              }}
            >
              NO DATA FOUND
            </Text>
          </View>
        )}

        {!loading && !error && items?.length > 0 && (
          <FlatList
            data={items}
            keyExtractor={(item) => item.moduleId.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 32 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </>
  );
};

/* =======================
   Small reusable stat
======================= */
const Stat = ({ label, value }: { label: string; value: number }) => (
  <View style={styles.statBox}>
    <Text variant="titleMedium">{value}</Text>
    <Text variant="bodySmall">{label}</Text>
  </View>
);

export default SubjectAttendanceScreen;

/* =======================
   Styles
======================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  card: {
    padding: 16,
    borderRadius: 18,
    marginBottom: 16,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  moduleName: {
    fontWeight: '700',
    flex: 1,
    paddingRight: 8,
  },

  percentage: {
    fontWeight: '700',
    fontSize: 16,
  },

  progress: {
    height: 8,
    borderRadius: 4,
    marginVertical: 12,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  statBox: {
    alignItems: 'center',
    flex: 1,
  },

  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
});
