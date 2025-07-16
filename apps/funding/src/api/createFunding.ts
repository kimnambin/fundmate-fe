import { commonApiInstance } from '@repo/ui/hooks';
import type { CreateFundingData } from '../types/createFunding.types';

export const createFunding = async (data: CreateFundingData) => {
  const response = await commonApiInstance.post('/projects', data);
  return response.data;
};

export const aiSummarize = async (data: {
  message: string;
}): Promise<{ summary: string }> => {
  const response = await commonApiInstance.post('/ai/summarize', data);
  return response.data;
};

// 로그인 임시 연동 코드
export const tempLogin = async (email: string, password: string) => {
  const response = await commonApiInstance.post('/auth/login', {
    email,
    password,
  });

  const token = response.data.accessToken;
  document.cookie = `accessToken=${token}; path=/;`;
  console.log('token : ', document.cookie);
  return token;
};
