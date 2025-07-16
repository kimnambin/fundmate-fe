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
    } else if (error.request) {
      console.error('Request is excuted but no response', error.request);
    } else {
      console.error('Error in front setting:', error.message);
    }

    return Promise.reject(error);
  },
);
