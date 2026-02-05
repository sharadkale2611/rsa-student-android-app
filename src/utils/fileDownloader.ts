// src/utils/fileDownloader.ts
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import { Alert, Platform } from 'react-native';

export const downloadFile = async (fileUrl: string) => {
  try {
    const fileName = fileUrl.split('/').pop() || `file_${Date.now()}`;

    const downloadPath =
      Platform.OS === 'android'
        ? `${RNFS.DownloadDirectoryPath}/${fileName}`
        : `${RNFS.DocumentDirectoryPath}/${fileName}`;

    const result = await RNFS.downloadFile({
      fromUrl: fileUrl,
      toFile: downloadPath,
    }).promise;

    if (result.statusCode === 200) {
      // 🔥 OPEN FILE IMMEDIATELY
      await FileViewer.open(downloadPath, {
        showOpenWithDialog: true, // Android chooser
      });
    } else {
      Alert.alert('Download Failed', 'Unable to download file');
    }
  } catch (error: any) {
    console.log('Download/Open error:', error);

    Alert.alert(
      'Error',
      'File downloaded but cannot be opened on this device'
    );
  }
};
