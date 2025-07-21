import axios from 'axios';
import { useEffect } from 'react';

interface LoginPayload {
  email: string;
  password: string;
}

export const tempLogin = (payload: LoginPayload) => {
  return axios.post(`/api/auth/login`, payload);
};

export const useTmpLogin = () => {
  useEffect(() => {
    // 로그인 임시 연동 코드
    const autoLogin = async () => {
      try {
        await tempLogin({ email: 'f@mail.com', password: 'zzz111' });
        console.log('임시 로그인');
      } catch (e) {
        console.error(e);
      }
    };
    autoLogin();
  }, []);
};
