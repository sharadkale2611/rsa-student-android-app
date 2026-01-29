import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, ActivityIndicator, Appbar, useTheme } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchWeeklyTimeTable } from "../../redux/thunks/timetableThunks";
import TodayTimetableCard from "../Timetable/TodayTimeTableCard";
import { useNavigation } from "@react-navigation/native";


export default function WeeklyTimetableScreen() {
  const dispatch = useAppDispatch();
  const { weekly, loading, error } = useAppSelector((state) => state.timetable);
  const theme = useTheme();
  const navigation = useNavigation<any>();

  useEffect(() => {
    dispatch(fetchWeeklyTimeTable());
  }, [dispatch]);

  
  const formatTime = (dateString: string) => {
    if (!dateString) return '--';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  
  const calculateEndTime = (start: string, hours: number = 2) => {
    if (!start || !hours) return '--';
    const date = new Date(start);
    date.setHours(date.getHours() + hours);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  
  const groupByDay = (items: any[]) => {
    const result: any = {};

    items.forEach((item) => {
      const day = new Date(item.expectedDateTime).toLocaleDateString("en-US", {
        weekday: "long",
      });

      if (!result[day]) result[day] = [];
      result[day].push(item);
    });

    return Object.entries(result).map(([day, classes]) => ({
      day,
      classes,
    }));
  };

  const weeklyData = groupByDay(weekly);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header elevated style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          color={theme.colors.primary}
        />
        <Appbar.Content
          title="Weekly Timetable"
          titleStyle={{ fontWeight: '700' }}
        />
      </Appbar.Header>

      {loading && <ActivityIndicator size="large" style={{ marginTop: 40 }} />}

      {!!error && (
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

      {!loading && !error && (
        <FlatList
          data={weeklyData}
          keyExtractor={(item) => item.day}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 30 }}>
              <Text style={[styles.dayTitle, { color: theme.colors.primary }]}>
                {item.day}
              </Text>

              {Array.isArray(item.classes) &&
                item.classes.map((cls: any, index: number) => (
                  <TodayTimetableCard
                    key={index}
                    trainerName={cls.trainerName}
                    classroomName={cls.classRoomName}
                    startTime={formatTime(cls.expectedDateTime)}
                    endTime={calculateEndTime(
                      cls.expectedDateTime,
                      cls.batchDurationInHr
                    )}
                    duration={`${cls.batchDurationInHr} Hrs`}
                    batchName={cls.batchName}
                    moduleName={cls.moduleName}
                    courseName={cls.courseName}
                  />
                ))}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  dayTitle: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 10,
  },
});
