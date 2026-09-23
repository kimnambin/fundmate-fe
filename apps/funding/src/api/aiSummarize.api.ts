import axios from 'axios';

export const aiSummarize = async (data: { message: string }) => {
  const response = await axios.post('/api/ai/summarize', data);
  return response.data;
};
