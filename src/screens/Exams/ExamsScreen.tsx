import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import {
  Appbar,
  Card,
  Text,
  useTheme,
  ActivityIndicator,
  SegmentedButtons,
  Chip,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchMyExams } from '../../redux/thunks/examsThunks';
import { fetchMyExamMarks } from '../../redux/thunks/examMarksThunks';


type TabType = 'all' | 'upcoming' | 'past';

const ExamsScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const { items, loading, error, filter } = useAppSelector(
    (state) => state.exams
  );

  const { items: examMarks } = useAppSelector(
    (state) => state.examMarks
  );


  const [tab, setTab] = useState<TabType>(filter);

  useEffect(() => {
    dispatch(fetchMyExams({ type: tab }));
  }, [dispatch, tab]);

  useEffect(() => {
    dispatch(fetchMyExams({ type: tab }));
    dispatch(fetchMyExamMarks());
  }, [dispatch, tab]);

  const examMarksMap = examMarks.reduce((acc: any, m: any) => {
    acc[m.examId] = m;
    return acc;
  }, {});


  // const renderItem = ({ item }: any) => {
  //   const examDate = item.examDateTime
  //     ? new Date(item.examDateTime)
  //     : null;

  //   const isUpcoming =
  //     examDate && examDate.getTime() >= Date.now();

  //   return (
  //     <Card style={styles.card} mode="elevated">
  //       {/* HEADER */}
  //       <View style={styles.headerRow}>
  //         <Text variant="titleMedium" style={styles.examName}>
  //           {item.examName}
  //         </Text>

  //         <Chip
  //           compact
  //           style={{
  //             backgroundColor: isUpcoming
  //               ? theme.colors.secondaryContainer
  //               : theme.colors.surfaceVariant,
  //           }}
  //         >
  //           {isUpcoming ? 'Upcoming' : 'Completed'}
  //         </Chip>
  //       </View>

  //       <Text style={styles.muted}>
  //         Module: {item.moduleName}
  //       </Text>

  //       {!!item.courseName && (
  //         <Text style={styles.muted}>
  //           Course: {item.courseName}
  //         </Text>
  //       )}

  //       {!!examDate && (
  //         <Text style={styles.date}>
  //           📅 {examDate.toLocaleString()}
  //         </Text>
  //       )}

  //       <View style={styles.metaRow}>
  //         {!!item.examDurationHrs && (
  //           <Text style={styles.meta}>
  //             ⏱ {item.examDurationHrs} hrs
  //           </Text>
  //         )}

  //         {!!item.examTotalMarks && (
  //           <Text style={styles.meta}>
  //             🎯 {item.examTotalMarks} marks
  //           </Text>
  //         )}

  //         {/* {!!item.examPassingMarks && (
  //           <Text style={styles.meta}>
  //             ✅ Pass: {item.examPassingMarks}
  //           </Text>
  //         )} */}
  //       </View>
  //     </Card>
  //   );
  // };


  const renderItem = ({ item }: any) => {
    const examDate = item.examDateTime
      ? new Date(item.examDateTime)
      : null;

    const isUpcoming =
      examDate && examDate.getTime() >= Date.now();

    const mark = examMarksMap[item.examId];

    return (
      <Card style={styles.card} mode="elevated">
        {/* HEADER */}
        <View style={styles.headerRow}>
          <Text variant="titleMedium" style={styles.examName}>
            {item.examName}
          </Text>

          <Chip
            compact
            style={{
              backgroundColor: isUpcoming
                ? theme.colors.secondaryContainer
                : theme.colors.surfaceVariant,
            }}
          >
            {isUpcoming ? 'Upcoming' : 'Completed'}
          </Chip>
        </View>

        <Text style={styles.muted}>
          Module: {item.moduleName}
        </Text>

        {!!item.courseName && (
          <Text style={styles.muted}>
            Course: {item.courseName}
          </Text>
        )}

        {!!examDate && (
          <Text style={styles.date}>
            📅 {examDate.toLocaleString()}
          </Text>
        )}

        {/* EXAM META */}
        <View style={styles.metaRow}>
          {!!item.examDurationHrs && (
            <Text style={styles.meta}>
              ⏱ {item.examDurationHrs} hrs
            </Text>
          )}

          {!!item.examTotalMarks && (
            <Text style={styles.meta}>
              🎯 {item.examTotalMarks} marks
            </Text>
          )}
        </View>

        {/* ✅ EXAM MARKS (ONLY FOR COMPLETED) */}
        {!isUpcoming && mark && (
          <View style={styles.marksRow}>

            <Text style={styles.marksText}>
              Marks Obtained: {mark.markObtained}
            </Text>
            <Chip
              compact
              style={{
                backgroundColor:
                  mark.grade === 'PASS'
                    ? '#2e7d32'
                    : '#c62828',
              }}
              textStyle={{ color: 'white', fontWeight: '700' }}
            >
              {mark.grade}
            </Chip>


          </View>
        )}
      </Card>
    );
  };



  return (
    <>
      {/* APPBAR */}
      <Appbar.Header elevated style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color={theme.colors.primary} />
        <Appbar.Content title="My Exams" titleStyle={{ fontWeight: '700' }} />
      </Appbar.Header>

      {/* BODY */}
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}
      >
        {/* TABS */}
        <SegmentedButtons
          value={tab}
          onValueChange={(v) => setTab(v as TabType)}
          buttons={[
            { value: 'all', label: 'All' },
            { value: 'upcoming', label: 'Upcoming' },
            { value: 'past', label: 'Past' },
          ]}
          style={styles.tabs}
        />

        {loading && (
          <ActivityIndicator style={{ marginTop: 24 }} />
        )}

        {!!error && (
          <Text style={{ color: theme.colors.error, marginTop: 16 }}>
            {error}
          </Text>
        )}

        {!loading && !error && (
          <FlatList
            data={items}
            keyExtractor={(item) => item.examId.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 32 }}
            ListEmptyComponent={
              <Text style={styles.empty}>
                No exams found
              </Text>
            }
          />
        )}
      </View>
    </>
  );
};

export default ExamsScreen;

/* =======================
   Styles
======================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  tabs: {
    marginBottom: 16,
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
    gap: 8,
  },

  examName: {
    fontWeight: '700',
    flex: 1,
  },

  muted: {
    marginTop: 4,
    opacity: 0.7,
  },

  date: {
    marginTop: 8,
    fontWeight: '600',
  },

  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 10,
  },

  meta: {
    fontSize: 12,
    opacity: 0.75,
  },

  empty: {
    marginTop: 32,
    textAlign: 'center',
    opacity: 0.6,
  },

  marksRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  marksText: {
    fontWeight: '600',
  },


});
