import { commonApiInstance } from '@repo/ui/hooks';
import type { CreateFundingData } from '../types/createFunding.types';

export const createFunding = async (data: CreateFundingData) => {
  const response = await commonApiInstance.post('/projects', data);
  return response.data;
};
