import axios from 'axios';
import { apiClient } from '@repo/ui/api-client';
import { v4 as uuidv4 } from 'uuid';

export const getPresignedUrl = async (file: File) => {
  const uuid = uuidv4();
  const extension = file.name.split('.').pop();
  const newFileName = `${uuid}.${extension}`;

  const response = await apiClient.get('/api/upload/presign', {
    params: {
      filename: newFileName,
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
  const response = await apiClient.post('/api/upload/complete', { key });
  return response.data;
};
