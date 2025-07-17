import { commonApiInstance } from '@repo/ui/hooks';
import axios from 'axios';

export const getPresignedUrl = async (file: File) => {
  const response = await commonApiInstance.get('/upload/presign', {
    params: {
      filename: file.name,
      contentType: file.type,
    },
  });
  return response.data;
};

export const uploadImageToS3 = async (presignedUrl: string, file: File) => {
  await axios.put(presignedUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
};

export const uploadComplete = async (key: string) => {
  const response = await commonApiInstance.post('/upload/complete', { key });
  return response.data;
};
