import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Card, Title, Paragraph, Chip, Button, useTheme } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchBatchStudyWorks } from '../../redux/thunks/batchStudyWorkThunks';
import { downloadFile } from '../../utils/fileDownloader';
import { formatDate } from '../../utils/formatDate';
import { styles } from './styles';
import { pickAndUploadAttachment } from '../../utils/pickAndUploadAttachment';
import CreateBatchStudyWorkModal from './CreateBatchStudyWorkModal';

export default function BatchStudyWorksScreen() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { list, loading, error } =
    useAppSelector((state) => state.batchStudyWorks);

  const authToken = useAppSelector((state) => state.auth?.token);

  useEffect(() => {
    dispatch(fetchBatchStudyWorks());
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} size="large" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  const getFileName = (path: string) => path.split('/').pop() || 'Attachment';

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={list}
        keyExtractor={(i) => i.batchStudyWorkId.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>{item.workTitle}</Title>

              <Chip style={{ marginBottom: 6 }}>
                {item.workType}
              </Chip>

              <Paragraph>Batch: {item.batchCode || '-'}</Paragraph>
              <Text>Due: {formatDate(item.expectedCompletionDate)}</Text>
              <Text>Assigned By: {item.assignedByName || '-'}</Text>

              {/* Upload Button */}
              <Button
                mode="contained"
                icon="upload"
                disabled={!authToken}
                style={{ marginTop: 10 }}
                onPress={async () => {
                  if (!authToken) return; // ✅ Type guard

                  await pickAndUploadAttachment(item.batchStudyWorkId, authToken);
                  dispatch(fetchBatchStudyWorks());
                }}
              >
                Upload Attachment
              </Button>

              {/* Attachments */}
              {item.attachments?.length > 0 && (
                <View style={{ marginTop: 10 }}>
                  {item.attachments?.map(att => (
                    <Button
                      key={att.batchStudyWorkAttachementId}
                      mode="text"
                      textColor={theme.colors.primary}
                      icon="download"
                      onPress={() => downloadFile(att.filePath)}
                    >
                      {getFileName(att.filePath)}
                    </Button>
                  ))}
                </View>
              )}
            </Card.Content>
          </Card>
        )}
      />

      {/* Bottom Button */}
      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={() => setShowCreateModal(true)}
        >
          Create Batch Study Work
        </Button>
      </View>

      <CreateBatchStudyWorkModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </View>
  );
}
