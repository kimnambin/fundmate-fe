import axios from 'axios';

// ==================TODO 임시 로그인==================
interface LoginPayload {
  email: string;
  password: string;
}

export const tempLogin = (payload: LoginPayload) => {
  return axios.post(`/api/auth/login`, payload);
};

export const userInfo = () => {
  return axios.get(`/api/users/mypage/profile`);
};
