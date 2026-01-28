import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, View, StyleSheet } from 'react-native';
import {
  Card,
  Text,
  Button,
  RadioButton,
  IconButton,
  Avatar,
  useTheme,
  ActivityIndicator,
  Divider,
  Appbar,
} from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  createAttendanceSession,
  fetchAttendanceBySessionId,
  fetchAttendanceSessionByBatch,
  submitAttendanceStatus,
} from '../../redux/thunks/attendanceThunks';
import { fetchStaffProfile } from '../../redux/thunks/profileThunks';
import { createNoticeThunk } from '../../redux/thunks/noticeThunks';
import { resetNoticeState } from '../../redux/slices/noticeSlice';
import SendNoticeModal from '../../components/SendNoticeModal';

const BatchStudentsScreen: React.FC = () => {
  const route = useRoute<any>();
  const { batchId, batchName } = route.params;

  const dispatch = useAppDispatch();
  const theme = useTheme();
  const navigation = useNavigation<any>();   // ⬅️ navigation hook

  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const staffProfile = useAppSelector((state) => state.staff.profile);

  const attendanceList = useAppSelector(
    (state) => state.attendance?.list ?? []
  );
  const loading = useAppSelector(
    (state) => state.attendance?.loading ?? false
  );
  const submitLoading = useAppSelector(
    (state) => state.attendance.submitLoading
  );
  const submitError = useAppSelector(
    (state) => state.attendance.submitError
  );

  const [sessionId, setSessionId] = useState<number | null>(null);
  const [isAttendanceMode, setIsAttendanceMode] = useState(false);
  const [attendanceMap, setAttendanceMap] = useState<Record<number, string>>(
    {}
  );

  const [noticeModalVisible, setNoticeModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  /* ================= STAFF PROFILE ================= */
  useEffect(() => {
    if (user?.userId && user?.firmId) {
      dispatch(
        fetchStaffProfile({
          userId: user.userId,
          firmId: user.firmId,
        })
      );
    }
  }, [user, dispatch]);

  /* ================= EXISTING SESSION ================= */

  useEffect(() => {
    if (!user?.userId) return;

    dispatch(
      fetchAttendanceSessionByBatch({
        batchId,
        userId: user.userId,
      })
    ).then((res: any) => {
      const existingSessionId = res.payload?.data?.sessionId;

      if (existingSessionId) {
        setSessionId(existingSessionId);
        dispatch(fetchAttendanceBySessionId(existingSessionId));
      }
    });
  }, [batchId, user?.userId, dispatch]);



  /* ================= CREATE SESSION ================= */
  const handleCreateSession = async () => {
    if (!staffProfile?.staffId) {
      Alert.alert('Staff profile not loaded');
      return;
    }

    const result = await dispatch(
      createAttendanceSession({
        batchId,
        staffId: staffProfile.staffId,
        moduleId: null,
      })
    );

    const newSessionId =
      result.payload?.data?.session?.sessionId ||
      result.payload?.data?.Session?.sessionId;

    if (!newSessionId) {
      Alert.alert('Unable to create attendance session');
      return;
    }

    setSessionId(newSessionId);
    dispatch(fetchAttendanceBySessionId(newSessionId));
  };

  /* ================= SUBMIT ATTENDANCE ================= */
  const handleSubmitAttendance = async () => {
    if (!sessionId) return;

    const attendanceUpdates = Object.entries(attendanceMap).map(
      ([attendanceId, status]) => {
        const student = attendanceList.find(
          (a: any) => a.attendanceId === Number(attendanceId)
        );

        return {
          attendanceId: Number(attendanceId),
          studentId: student.studentId,
          status,
        };
      }
    );

    const result = await dispatch(
      submitAttendanceStatus({
        sessionId,
        attendanceUpdates,
      })
    );

    if (submitAttendanceStatus.fulfilled.match(result)) {
      Alert.alert('Success', 'Attendance submitted successfully');
      setIsAttendanceMode(false);
      setAttendanceMap({});
      dispatch(fetchAttendanceBySessionId(sessionId));
    } else {
      Alert.alert('Error', submitError || 'Failed to submit attendance');
    }
  };

  /* ================= STATUS CHIP ================= */
  const StatusChip = ({ status }: { status: string }) => {
    const bg =
      status === 'Present'
        ? theme.colors.primaryContainer
        : status === 'Absent'
          ? theme.colors.errorContainer
          : theme.colors.surfaceVariant;

    const color =
      status === 'Present'
        ? theme.colors.primary
        : status === 'Absent'
          ? theme.colors.error
          : theme.colors.onSurfaceVariant;

    return (
      <View style={[styles.statusChip, { backgroundColor: bg }]}>
        <Text style={{ color, fontWeight: '600' }}>{status}</Text>
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >

      {/* 👈 BACK ARROW APPBAR */}
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title={batchName} />
    </Appbar.Header>
      {/* ================= HEADER ================= */}
      <Card style={styles.headerCard} mode="elevated">
        <Text variant="titleLarge" style={{ fontWeight: '700' }}>
          {batchName}
        </Text>

        <View style={styles.headerActions}>
          <Button
            mode="contained"
            disabled={!!sessionId}
            onPress={handleCreateSession}
          >
            Create Session
          </Button>

          <Button
            mode="outlined"
            disabled={!sessionId}
            onPress={() => setIsAttendanceMode((p) => !p)}
          >
            Attendance
          </Button>
        </View>
      </Card>

      {!sessionId && (
        <Text
          variant="bodyMedium"
          style={{ textAlign: 'center', marginVertical: 20 }}
        >
          Create a session to start attendance
        </Text>
      )}

      {loading && <ActivityIndicator style={{ marginVertical: 20 }} />}

      {/* ================= STUDENT LIST ================= */}
      {!loading &&
        attendanceList.map((item: any) => {
          const selectedStatus =
            attendanceMap[item.attendanceId] || item.status;

          return (
            <Card key={item.attendanceId} style={styles.studentCard}>
              <View style={styles.studentRow}>
                <Avatar.Text
                  size={44}
                  label={item.student.firstName[0]}
                  style={{ backgroundColor: theme.colors.primary }}
                />

                <View style={styles.studentInfo}>
                  <Text variant="titleMedium" style={{ fontWeight: '600' }}>
                    {item.student.firstName} {item.student.lastName}
                  </Text>

                  {!isAttendanceMode && (
                    <StatusChip status={selectedStatus} />
                  )}
                </View>

                {!isAttendanceMode && (
                  <IconButton
                    icon="message-text-outline"
                    onPress={() => {
                      setSelectedStudent(item.student);
                      setNoticeModalVisible(true);
                    }}
                  />
                )}
              </View>

              {isAttendanceMode && (
                <>
                  <Divider />
                  <RadioButton.Group
                    value={selectedStatus}
                    onValueChange={(value) =>
                      setAttendanceMap((prev) => ({
                        ...prev,
                        [item.attendanceId]: value,
                      }))
                    }
                  >
                    <View style={styles.radioRow}>
                      <RadioButton value="Present" />
                      <Text>Present</Text>

                      <RadioButton value="Absent" />
                      <Text>Absent</Text>

                      <RadioButton value="Pending" />
                      <Text>Pending</Text>
                    </View>
                  </RadioButton.Group>
                </>
              )}
            </Card>
          );
        })}

      {isAttendanceMode && (
        <Button
          mode="contained"
          loading={submitLoading}
          disabled={submitLoading}
          onPress={handleSubmitAttendance}
          style={{ marginVertical: 30 }}
        >
          Submit Attendance
        </Button>
      )}

      {/* ================= NOTICE MODAL ================= */}
      <SendNoticeModal
        visible={noticeModalVisible}
        onClose={() => setNoticeModalVisible(false)}
        targetType="STUDENT"
        targetName={`${selectedStudent?.firstName} ${selectedStudent?.lastName}`}
        onSend={async (title, message) => {
          if (!selectedStudent || !token) return;

          const result = await dispatch(
            createNoticeThunk({
              title,
              description: message,
              createdFor: 'STUDENT',
              studentId: selectedStudent.studentId,
              token,
              createdBy: user?.username,
            })
          );

          if (createNoticeThunk.fulfilled.match(result)) {
            Alert.alert('Success', 'Notice sent to student');
            dispatch(resetNoticeState());
          } else {
            Alert.alert('Error', result.payload ?? 'Failed to send notice');
          }
        }}
      />
    </ScrollView>
  );
};

export default BatchStudentsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  headerCard: {
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  studentCard: {
    borderRadius: 16,
    marginBottom: 12,
    padding: 12,
  },
  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  statusChip: {
    marginTop: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 6,
  },
});
