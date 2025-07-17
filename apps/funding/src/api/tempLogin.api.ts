import { commonApiInstance } from '@repo/ui/hooks';

// 로그인 임시 연동 코드
export const tempLogin = async (email: string, password: string) => {
  const response = await commonApiInstance.post('/auth/login', {
    email,
    password,
  });

  const token = response.data.accessToken;
  document.cookie = `accessToken=${token}; path=/;`;
  return token;
};
