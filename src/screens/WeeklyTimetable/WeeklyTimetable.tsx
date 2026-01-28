import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, ActivityIndicator, Appbar } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchWeeklyTimeTable } from "../../redux/thunks/timetableThunks";
import TodayTimetableCard from "../Timetable/TodayTimeTableCard";
import { useNavigation } from "@react-navigation/native";


export default function WeeklyTimetableScreen() {
  const dispatch = useAppDispatch();
  const { weekly, loading, error } = useAppSelector((state) => state.timetable);
   const navigation = useNavigation<any>();

  useEffect(() => {
    dispatch(fetchWeeklyTimeTable());
  }, []);

  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  
  const calculateEndTime = (start: string, hours: number = 2) => {
    const date = new Date(start);
    date.setHours(date.getHours() + hours);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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

  if (loading) return <ActivityIndicator size="large" color="blue" />;
  if (error) return <Text style={{ color: "red" }}>Error: {error}</Text>;

  const weeklyData = groupByDay(weekly);

  return (
    <View style={styles.container}>

      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Weekly Timetable" />
      </Appbar.Header>
      <FlatList
        data={weeklyData}
        keyExtractor={(item) => item.day}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 30 }}>
            {/* DAY TITLE */}
            <Text style={styles.dayTitle}>{item.day}</Text>

            {/* CLASS CARDS */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  dayTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#E74C3C",
    marginBottom: 10,
  },
});
