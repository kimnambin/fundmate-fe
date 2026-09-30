import { apiClient } from '@repo/ui/api-client';

export const getProductInfo = () => {
  return apiClient.get(`/api/projects`);
};

interface SettingsPayload {
  image_url: string;                      // 이미지 url string
  nickname: string;                  // 닉네임 string
  gender: string;                       // 성별 string
  age_id: number;                            // 나이 id 값 number
  contents: string;  // 소개글 string
  category_id: number;                        // 카테고리 id 값 number
}

export const settings = (payload: SettingsPayload) => {
  return apiClient.put(`/api/users/mypage/profile`, payload);
};