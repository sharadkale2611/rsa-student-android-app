import React, { useEffect } from 'react';
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
  Button,
  Chip,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchMyBatchStudyWorks } from '../../redux/thunks/batchStudyWorksThunks';
import Config from 'react-native-config';
import { downloadFile } from '../../utils/fileDownloader';

const BatchStudyWorksScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const { items, loading, error } = useAppSelector(
    (state) => state.batchStudyWorks
  );

  useEffect(() => {
    dispatch(fetchMyBatchStudyWorks());
  }, [dispatch]);

  const getFileName = (path: string) => path.split('/').pop() || 'Attachment';

  const toAbsoluteUrl = (path: string) => {
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    const base = (Config.API_URL || '').replace(/\/+$/, '');
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${base}${normalizedPath}`;
  };

  const renderItem = ({ item }: any) => {
    const isOverdue =
      item.expectedCompletionDate &&
      new Date(item.expectedCompletionDate) < new Date();

    return (
      <Card style={styles.card} mode="elevated">
        {/* HEADER */}
        <View style={styles.headerRow}>
          <Text variant="titleMedium" style={styles.title}>
            {item.workTitle}
          </Text>

          <Chip
            compact
            style={{
              backgroundColor: isOverdue
                ? theme.colors.errorContainer
                : theme.colors.secondaryContainer,
            }}
          >
            {item.workType}
          </Chip>
        </View>

        {!!item.courseName && (
          <Text style={styles.muted}>Course: {item.courseName}</Text>
        )}

        {!!item.moduleName && (
          <Text style={styles.muted}>Module: {item.moduleName}</Text>
        )}

        {!!item.batchCode && (
          <Text style={styles.muted}>Batch: {item.batchCode}</Text>
        )}

        <Text style={styles.muted}>
          Assigned by: {item.assignedByName}
        </Text>

        {!!item.workDescription && (
          <Text style={{ marginTop: 8 }}>
            {item.workDescription}
          </Text>
        )}

        {!!item.expectedCompletionDate && (
          <Text
            style={{
              marginTop: 8,
              color: isOverdue
                ? theme.colors.error
                : theme.colors.onSurfaceVariant,
            }}
          >
            Due: {item.expectedCompletionDate}
          </Text>
        )}

        {/* ATTACHMENTS */}
        {item.attachments?.length > 0 && (
          <View style={styles.attachments}>
            <Text variant="titleSmall">Attachments</Text>

            {item.attachments.map((a: any) => (
              <Button
                key={a.batchStudyWorkAttachementId}
                icon="download"
                mode="text"
                compact
                style={styles.attachmentBtn}
                onPress={() => downloadFile(toAbsoluteUrl(a.filePath))}
              >
                {getFileName(a.filePath)}
              </Button>
            ))}
          </View>
        )}
      </Card>
    );
  };

  return (
    <>
      {/* APPBAR */}
      <Appbar.Header elevated style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.BackAction onPress={() => navigation.goBack()}
          color={theme.colors.primary} />
        <Appbar.Content title="Assignments" titleStyle={{ fontWeight: '700' }} subtitle="Assigned to you" />
      </Appbar.Header>

      {/* BODY */}
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}
      >
        {loading && (
          <ActivityIndicator style={{ marginTop: 32 }} />
        )}

        {!!error && (
          <Text style={{ color: theme.colors.error, marginTop: 16 }}>
            {error}
          </Text>
        )}

        {!loading && !error && (
          <FlatList
            data={items}
            keyExtractor={(item) =>
              item.batchStudyWorkId.toString()
            }
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 32 }}
            ListEmptyComponent={
              <Text style={{ marginTop: 32, opacity: 0.6 }}>
                No study works assigned
              </Text>
            }
          />
        )}
      </View>
    </>
  );
};

export default BatchStudyWorksScreen;

/* =======================
   Styles
======================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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

  title: {
    fontWeight: '700',
    flex: 1,
  },

  muted: {
    marginTop: 4,
    opacity: 0.7,
  },

  attachments: {
    marginTop: 16,
    gap: 8,
  },

  attachmentBtn: {
    alignSelf: 'flex-start',
  },
});
