import axios from 'axios';
import Config from 'react-native-config';
import { launchImageLibrary } from 'react-native-image-picker';

export const pickAndUploadAttachment = async (
  batchStudyWorkId: number,
  token: string
) => {
  return new Promise((resolve, reject) => {
    launchImageLibrary(
      {
        mediaType: 'mixed',
        selectionLimit: 1,
        includeBase64: false,
      },
      async (res) => {
        if (res.didCancel) return;
        if (res.errorCode) return reject(res.errorMessage);

        const asset = res.assets?.[0];
        if (!asset?.uri) return reject('No file selected');

        const formData = new FormData();
        formData.append('BatchStudyWorkId', batchStudyWorkId.toString());
        formData.append('File', {
          uri: asset.uri,
          name: asset.fileName ?? 'file',
          type: asset.type ?? 'application/octet-stream',
        } as any);

        try {
          const API_BASE = Config.API_URL;

          const response = await axios.post(
            `${API_BASE}/api/BatchStudyWorkAttachements/upload`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
              },
            }
          );

          resolve(response.data);
        } catch (e) {
          reject(e);
        }
      }
    );
  });
};
