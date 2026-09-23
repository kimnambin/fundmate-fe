import axios from 'axios';

export const userInfo = () => {
  return axios.get(`/api/users/mypage/profile`);
};
