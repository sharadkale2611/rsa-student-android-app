import React, { useEffect, useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  useTheme,
  Card,
  Button,
  Text,
  IconButton,
} from "react-native-paper";

import styles from "./styles";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchBatchesByStaff } from "../../redux/thunks/batchThunks";
import SendNoticeModal from "../../components/SendNoticeModal";
import { createNoticeThunk } from "../../redux/thunks/noticeThunks";
import { resetNoticeState } from "../../redux/slices/noticeSlice";

const MyBatchesScreen: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();

  const { batches, loading, error } = useAppSelector(
    (state) => state.batches
  );
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<any>(null);

  /* ================= FETCH BATCHES ================= */
  useEffect(() => {
    if (user?.userId) {
      dispatch(fetchBatchesByStaff(user.userId));
    }
  }, [user, dispatch]);

  /* ================= LOADING / ERROR ================= */
  if (loading) {
    return (
      <Text style={{ marginTop: 40, textAlign: "center" }}>
        Loading...
      </Text>
    );
  }

  if (error) {
    return (
      <Text
        style={{
          marginTop: 40,
          textAlign: "center",
          color: "red",
        }}
      >
        Error: {error}
      </Text>
    );
  }

  /* ================= UI ================= */
  return (
    <ScrollView contentContainerStyle={[styles.container]}>
      <Text
        style={[
          styles.title,
          { color: theme.colors.onBackground },
        ]}
      >
        My Batches
      </Text>

      {batches.map((batch) => (
        <Card key={batch.batchId} style={styles.card}>
          <Card.Content>
            {/* HEADER: Batch Name + Message Icon */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={[
                  styles.batchName,
                  { color: theme.colors.onBackground },
                ]}
              >
                {batch.batchName}
              </Text>

              {/* ✉️ MESSAGE ICON */}
              <IconButton
                icon="message-text-outline"
                size={24}
                onPress={() => {
                  setSelectedBatch(batch);
                  setModalVisible(true);
                }}
              />
            </View>

            <Text style={styles.info}>
              Course: {batch.courseName}
            </Text>

            <Text style={styles.info}>
              Subject: {batch.subjectName}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <Text style={styles.info}>
                Strength: {batch.studentStrengthCount} Students
              </Text>

              <Button
                mode="contained"
                onPress={() =>
                  navigation.navigate("BatchStudents", {
                    batchId: batch.batchId,
                    batchName: batch.batchName,
                  })
                }
              >
                View Student
              </Button>
            </View>
          </Card.Content>
        </Card>
      ))}

      {/* ================= SEND NOTICE MODAL ================= */}
      <SendNoticeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        targetType="BATCH"
        targetName={selectedBatch?.batchName}
        onSend={async (title, message) => {
          if (!selectedBatch || !token) return;

          const result = await dispatch(
            createNoticeThunk({
              title,
              description: message,
              createdFor: "BATCH",
              batchId: selectedBatch.batchId,
              token,
              createdBy: user?.username,
            })
          );

          if (createNoticeThunk.fulfilled.match(result)) {
            Alert.alert("Success", "Notice sent to batch");
            dispatch(resetNoticeState());
          } else {
            Alert.alert(
              "Error",
              result.payload ?? "Failed to send notice"
            );
          }
        }}
      />
    </ScrollView>
  );
};

export default MyBatchesScreen;
