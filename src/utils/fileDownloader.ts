import RNFS from 'react-native-fs';
import { Alert, Platform } from 'react-native';

export const downloadFile = async (fileUrl: string) => {
  try {
    const fileName = fileUrl.split('/').pop() || `file_${Date.now()}`;
    const downloadPath =
      Platform.OS === 'android'
        ? `${RNFS.DownloadDirectoryPath}/${fileName}`
        : `${RNFS.DocumentDirectoryPath}/${fileName}`;

    const options = {
      fromUrl: fileUrl,
      toFile: downloadPath,
    };

    const result = await RNFS.downloadFile(options).promise;

    if (result.statusCode === 200) {
      Alert.alert('Download Complete', `Saved to ${downloadPath}`);
    } else {
      Alert.alert('Download Failed', 'Unable to download file');
    }
  } catch (error) {
    console.log('Download error:', error);
    Alert.alert('Error', 'Something went wrong while downloading');
  }
};
