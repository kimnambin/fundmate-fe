import { useMutation } from '@tanstack/react-query';
import {
  getPresignedUrl,
  uploadComplete,
  uploadImageToS3,
} from './imageUpload.api';

// presigned URL 발급 → S3 업로드 → 업로드 완료 알림까지 하고 최종 이미지 URL을 돌려준다.
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
