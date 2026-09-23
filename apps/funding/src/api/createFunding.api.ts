import axios from 'axios';
import type { CreateFundingData } from '../types/createFunding.types';

export const createFunding = async (data: CreateFundingData) => {
  const response = await axios.post('/api/projects', data);
  return response.data;
};
