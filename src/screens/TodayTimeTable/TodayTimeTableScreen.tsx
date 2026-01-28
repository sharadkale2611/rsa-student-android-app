import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import {
  Text,
  useTheme,
  ActivityIndicator,
  Appbar,
} from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import { fetchTodayTimeTable } from '../../redux/thunks/timetableThunks';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import TodayTimetableCard from '../Timetable/TodayTimeTableCard';


const formatTime = (dateString: string) => {
  if (!dateString) return '--';
  const date = new Date(dateString);
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const calculateEndTime = (start: string, durationHr: number) => {
  if (!start || !durationHr) return '--';
  const date = new Date(start);
  date.setHours(date.getHours() + durationHr);
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};


const TodayTimeTableScreen: React.FC = () => {

  const dispatch = useAppDispatch();
  const theme = useTheme();
  const navigation = useNavigation<any>();

  const { today, loading, error } = useAppSelector(
    (state) => state.timetable
  );

  useEffect(() => {
    dispatch(fetchTodayTimeTable());
  }, [dispatch]);


  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>

      {/* 👈 BACK ARROW APPBAR */}

      <Appbar.Header elevated style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          color={theme.colors.primary}
        />
        <Appbar.Content
          title="Today's Timetable"
          titleStyle={{ fontWeight: '700' }}
        />
      </Appbar.Header>


      {/* Loading */}
      {loading && (
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      )}

      {/* Error */}
      {error && (
        <Text
          style={{
            color: theme.colors.error,
            textAlign: 'center',
            marginTop: 30,
          }}
        >
          {error}
        </Text>
      )}


      {/* Timetable List */}
      {!loading && !error && (
        <FlatList
          data={today}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <TodayTimetableCard
              trainerName={item.trainerName}
              classroomName={item.classRoomName}
              startTime={formatTime(item.expectedDateTime)}
              endTime={calculateEndTime(
                item.expectedDateTime,
                item.batchDurationInHr
              )}
              duration={`${item.batchDurationInHr} Hrs`}
              batchName={item.batchName}
              moduleName={item.moduleName}
              courseName={item.courseName}
            />
          )}
        />
      )}
    </View>
  );
};

export default TodayTimeTableScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
