import axios from 'axios';

export const getProductInfo = () => {
  return axios.get(`/api/projects`);
};

interface LoginPayload {
  email: string;
  password: string;
}

interface SettingsPayload {
  image_url: string;                      // 이미지 url string
  nickname: string;                  // 닉네임 string
  gender: string;                       // 성별 string
  age_id: number;                            // 나이 id 값 number
  contents: string;  // 소개글 string
  category_id: number;                        // 카테고리 id 값 number
}

// TODO 임시 로그인
export const tempLogin = (payload: LoginPayload) => {
  return axios.post(`/api/auth/login`, payload);
};

export const settings = (payload: SettingsPayload) => {
  return axios.put(`/api/users/mypage/profile`, payload);
};