import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Text, RadioButton, Card, Button, useTheme } from "react-native-paper";

const students = [
  { id: 1, name: "Student 1" },
  { id: 2, name: "Student 2" },
  { id: 3, name: "Student 3" },
];

const PendingAttendanceScreen = () => {
  const theme = useTheme();

  const [attendance, setAttendance] = useState(
    students.reduce((acc, s) => {
      acc[s.id] = "no";
      return acc;
    }, {} as Record<number, string>)
  );

  const handleSubmit = () => {
    console.log("Submitted:", attendance);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 20 }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          color: theme.colors.onBackground,
          marginBottom: 10,
        }}
      >
        Pending Attendance
      </Text>

      {students.map((student) => (
        <Card key={student.id} style={{ marginVertical: 8 }}>
          <Card.Content>
            <Text
              style={{
                fontSize: 18,
                color: theme.colors.onBackground,
                marginBottom: 10,
              }}
            >
              {student.name}
            </Text>

            <RadioButton.Group
              onValueChange={(value) =>
                setAttendance({ ...attendance, [student.id]: value })
              }
              value={attendance[student.id]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton value="present" />
                <Text style={{ marginRight: 20 }}>Present</Text>

                <RadioButton value="absent" />
                <Text style={{ marginRight: 20 }}>Absent</Text>

                <RadioButton value="leave" />
                <Text>Leave</Text>
              </View>
            </RadioButton.Group>
          </Card.Content>
        </Card>
      ))}

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={{ marginTop: 20 }}
      >
        Submit Attendance
      </Button>
    </ScrollView>
  );
};

export default PendingAttendanceScreen;
