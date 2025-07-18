import { commonApiInstance } from '@repo/ui/hooks';
import type { aiRequestData } from '../types/aiRequest.types';

export const aiRequest = async (data: aiRequestData) => {
  const response = await commonApiInstance.post('/ai/requests', data);
  return response.data;
};
