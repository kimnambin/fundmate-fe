import { apiClient } from '@repo/ui/api-client';

export const getProductInfo = (id: number) => {
  return apiClient.get(`/api/projects/${id}`);
};
