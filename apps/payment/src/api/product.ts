import axios from 'axios';

export const getProductInfo = (id: number) => {
  return axios.get(`/api/projects/${id}`);
};

// ==================TODO 임시 로그인==================
interface LoginPayload {
  email: string;
  password: string;
}

export const tempLogin = (payload: LoginPayload) => {
  return axios.post(`/api/auth/login`, payload);
};
