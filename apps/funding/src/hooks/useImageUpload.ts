import { useMutation } from '@tanstack/react-query';
import {
  getPresignedUrl,
  uploadComplete,
  uploadImageToS3,
} from '../api/imageUpload.api';

export const useImageUpload = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const { url, key } = await getPresignedUrl(file);
      await uploadImageToS3(url, file);
      const { url: imageUrl } = await uploadComplete(key);
      return imageUrl;
    },
  });
};
