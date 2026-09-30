import { apiClient } from '@repo/ui/api-client';

export const userInfo = () => {
  return apiClient.get(`/api/users/mypage/profile`);
};
