import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Text, RadioButton, Card, Button, useTheme } from "react-native-paper";

const students = [
  { id: 1, name: "Student A" },
  { id: 2, name: "Student B" },
  { id: 3, name: "Student C" }
];

const PendingAssignmentScreen = () => {
  const theme = useTheme();

  const [attendance, setAttendance] = useState(
    students.reduce((acc, s) => {
      acc[s.id] = "no";
      return acc;
    }, {} as Record<number, string>)
  );

//   const handleSubmit = () => {
//     console.log("Submitted:", attendance);
//   };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 20 }}
    >
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Pending Assignment
      </Text>

      {students.map((student) => (
        <Card key={student.id} style={{ marginVertical: 8 }}>
          <Card.Content>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
              {student.name}
            </Text>

            <RadioButton.Group
              onValueChange={(value) =>
                setAttendance({ ...attendance, [student.id]: value })
              }
              value={attendance[student.id]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton value="completed" />
                <Text style={{ marginRight: 20 }}>Completed</Text>

                <RadioButton value="pending" />
                <Text style={{ marginRight: 20 }}>Pending</Text>
              </View>
            </RadioButton.Group>
          </Card.Content>
        </Card>
      ))}

      <Button mode="contained" onPress={handleSubmit} style={{ marginTop: 20 }}>
        Submit Assignment
      </Button>
    </ScrollView>
  );
};

export default PendingAssignmentScreen;