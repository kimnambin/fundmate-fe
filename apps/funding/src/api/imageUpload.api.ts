import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const getPresignedUrl = async (file: File) => {
  const uuid = uuidv4();
  const extension = file.name.split('.').pop();
  const newFileName = `${uuid}.${extension}`;

  const response = await axios.get('/api/upload/presign', {
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
  const response = await axios.post('/api/upload/complete', { key });
  return response.data;
};
