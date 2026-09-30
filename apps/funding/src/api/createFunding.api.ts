import { apiClient } from '@repo/ui/api-client';
import type { CreateFundingData } from '../types/createFunding.types';

export const createFunding = async (data: CreateFundingData) => {
  const response = await apiClient.post('/api/projects', data);
  return response.data;
};
