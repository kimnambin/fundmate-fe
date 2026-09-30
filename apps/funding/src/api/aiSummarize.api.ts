import { apiClient } from '@repo/ui/api-client';

export const aiSummarize = async (data: { message: string }) => {
  const response = await apiClient.post('/api/ai/summarize', data);
  return response.data;
};
