import axios from 'axios';

export const getProductInfo = (id: number) => {
  return axios.get(`/api/projects/${id}`);
};
