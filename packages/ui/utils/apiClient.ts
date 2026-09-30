import axios from 'axios';
import { handleUnauthorizedError } from './auth';

// 모든 앱이 공통으로 쓰는 axios 인스턴스.
// - 요청은 같은 origin의 `/api/...`로 보내고(dev는 vite proxy, 배포는 vercel rewrite),
//   쿠키 기반 인증이므로 `withCredentials`를 기본으로 켠다.
// - 401은 react-query 밖에서 호출해도 공통 처리(nickname 삭제 + /login 이동)한다.
// 외부 도메인(S3 presigned URL 등)에는 쓰지 말고 `axios`를 직접 사용한다.
export const apiClient = axios.create({ withCredentials: true });

apiClient.interceptors.response.use(undefined, (error: unknown) => {
  handleUnauthorizedError(error);
  return Promise.reject(error);
});
