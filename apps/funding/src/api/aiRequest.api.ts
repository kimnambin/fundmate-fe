import { apiClient } from '@repo/ui/api-client';
import type { aiRequestData } from '../types/aiRequest.types';

export const aiRequest = async (data: aiRequestData) => {
  const response = await apiClient.post('/api/ai/requests', data);
  return response.data;
};
