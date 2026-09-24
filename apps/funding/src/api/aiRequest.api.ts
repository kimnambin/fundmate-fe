import axios from 'axios';
import type { aiRequestData } from '../types/aiRequest.types';

export const aiRequest = async (data: aiRequestData) => {
  const response = await axios.post('/api/ai/requests', data);
  return response.data;
};
