import React, { useState } from "react";
import { View } from "react-native";
import { Text, Card, RadioButton, Button } from "react-native-paper";

export default function MarkAttendanceScreen() {
  const [students, setStudents] = useState([
    { id: 1, name: "Pooja", attendance: "" },
    { id: 2, name: "Sourabh", attendance: "" },
  ]);

  return (
    <View style={{ padding: 20 }}>
      <Text variant="titleLarge">Mark Attendance</Text>

      {students.map((s) => (
        <Card key={s.id} style={{ marginTop: 15 }}>
          <Card.Content>
            <Text>{s.name}</Text>

            <RadioButton.Group
              onValueChange={(v) =>
                setStudents((prev) =>
                  prev.map((x) =>
                    x.id === s.id ? { ...x, attendance: v } : x
                  )
                )
              }
              value={s.attendance}
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

      <Button mode="contained" style={{ marginTop: 20 }}>
        Submit
      </Button>
    </View>
  );
}
