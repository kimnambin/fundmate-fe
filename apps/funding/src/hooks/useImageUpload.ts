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
      console.log('presigned URL 발급\nurl: ', url, '\nkey: ', key);
      await uploadImageToS3(url, file);
      console.log('s3에 이미지 업로드 완료');
      const { url: imageUrl } = await uploadComplete(key);
      console.log('업로드 여부 전달 완료\nimageUrl :', imageUrl);
      return imageUrl;
    },
  });
};
