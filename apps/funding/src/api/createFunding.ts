import { axiosInstance } from '@repo/ui/hooks';
import type {
  CreateFundingData,
  CreateOptionData,
} from '../types/createFunding.types';

export const createFunding = async (data: CreateFundingData) => {
  const response = await axiosInstance.post('/api/projects', data);
  return response.data;
};

export const createOption = async (data: CreateOptionData) => {
  const response = await axiosInstance.post('/api/options', data);
  return response.data;
};

export const deleteOption = async (
  id: number,
): Promise<{ message: string }> => {
  const response = await axiosInstance.delete(`/api/options/${id}`);
  return response.data;
};

// 로그인 임시 연동 코드
export const tempLogin = async (email: string, password: string) => {
  const response = await axiosInstance.post('/api/auth/login', {
    email,
    password,
  });

  const token = response.data.accessToken;
  document.cookie = `accessToken=${token}; path=/;`;
  console.log('token : ', document.cookie);
  return token;
};
