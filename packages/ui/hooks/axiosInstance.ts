import axios from 'axios';

export const commonApiInstance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

commonApiInstance.interceptors.request.use(
  (config) => {
    console.log('Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
  },
);

commonApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Response Error:', {
        status: error.response.status,
        data: error.response.data,
        url: error.response.url,
      });

      if (error.response.data.message === '로그인 필요') {
        alert('로그인이 필요합니다.');
        window.location.href = '/login';
      }
    } else if (error.request) {
      console.error('Request is excuted but no response', error.request);
    } else {
      console.error('Error in front setting:', error.message);
    }

    return Promise.reject(error);
  },
);
