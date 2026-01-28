// src/screens/NotiveBoard/NoticeBoardScreen.tsx

import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  Card,
  Text,
  Chip,
  ActivityIndicator,
  Divider,
  IconButton,
} from "react-native-paper";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";

// Thunks
import {
  fetchNoticesThunk,
  updateNoticeThunk,
} from "../../redux/thunks/fetchnoticeThunks";

// Modal
import SendNoticeModal from "../../components/SendNoticeModal";

const NoticeBoardScreen = () => {
  const dispatch = useAppDispatch();

  /* ================= REDUX ================= */
  const { notice, loading, error } = useAppSelector(
    (state) => state.notice
  );
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);

  /* ================= LOCAL STATE ================= */
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<any>(null);

  /* ================= FETCH ================= */
  useEffect(() => {
    if (token) {
      dispatch(fetchNoticesThunk({ token }));
    }
  }, [token, dispatch]);

  /* ================= LOADING / ERROR ================= */
  if (loading) {
    return (
      <ActivityIndicator
        style={{ marginTop: 40 }}
        size="large"
      />
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  /* ================= UI ================= */
  return (
    <>
      <FlatList
        data={notice}
        keyExtractor={(item) => item.noticeId.toString()}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <Card style={styles.card} elevation={3}>
            {/* HEADER */}
            <Card.Title
              title={item.title || "Notice"}
              subtitle={`Created By: ${item.createdBy}`}
              titleStyle={styles.title}
              subtitleStyle={styles.subtitle}
              right={() => (
                <View style={styles.headerRight}>
                  <Text style={styles.headerDate}>
                    {new Date(item.createdAt).toDateString()}
                  </Text>

                  {/* EDIT → ONLY OWNER */}
                  {item.createdBy === user?.username && (
                    <IconButton
                      icon="pencil-outline"
                      size={20}
                      onPress={() => {
                        setSelectedNotice(item);
                        setModalVisible(true);
                      }}
                    />
                  )}
                </View>
              )}
            />

            <Divider />

            {/* CONTENT */}
            <Card.Content style={styles.content}>
              <Text style={styles.label}>Description</Text>
              <Text style={styles.description}>
                {item.description}
              </Text>

              <Text style={styles.label}>Sent To</Text>

              {item.createdFor === "BATCH" ? (
                <Chip icon="account-group" style={styles.batchChip}>
                  Batch: {item.batchName}
                </Chip>
              ) : (
                <Chip icon="account" style={styles.studentChip}>
                  Student: {item.studentName}
                </Chip>
              )}
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No notices available
          </Text>
        }
      />

      {/* ================= EDIT MODAL ================= */}
      <SendNoticeModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedNotice(null);
        }}
        isEdit
        targetType={selectedNotice?.createdFor}
        targetName={
          selectedNotice?.createdFor === "BATCH"
            ? selectedNotice?.batchName
            : selectedNotice?.studentName
        }
        initialTitle={selectedNotice?.title}
        initialMessage={selectedNotice?.description}
        onSend={(title, message) => {
if (!selectedNotice || !token) return;
          dispatch(
            updateNoticeThunk({
              noticeId: selectedNotice.noticeId,
              title,
              description: message,
              token,
            })
          );
        }}
      />
    </>
  );
};

export default NoticeBoardScreen;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 14,
    borderRadius: 14,
    backgroundColor: "#fff",
  },
  content: {
    marginTop: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  subtitle: {
    fontSize: 13,
    opacity: 0.7,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    marginTop: 12,
    marginBottom: 4,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
  batchChip: {
    backgroundColor: "#E3F2FD",
    marginTop: 6,
  },
  studentChip: {
    backgroundColor: "#E8F5E9",
    marginTop: 6,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerDate: {
    fontSize: 11,
    color: "#777",
    marginRight: 4,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    opacity: 0.7,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
