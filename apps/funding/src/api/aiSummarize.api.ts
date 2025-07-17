import { commonApiInstance } from '@repo/ui/hooks';

export const aiSummarize = async (data: { message: string }) => {
  const response = await commonApiInstance.post('/ai/summarize', data);
  return response.data;
};
