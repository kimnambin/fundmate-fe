import { isAxiosError } from 'axios';

// 401이 와도 로그인 화면 자체에서는 이동시키지 않는다 (로그인 실패 응답 등)
const AUTH_PATHS = ['/login', '/signup', '/reset'];

export const isUnauthorizedError = (error: unknown) =>
  isAxiosError(error) && error.response?.status === 401;

// TanStack Query의 QueryCache/MutationCache `onError`에 연결해서 쓴다.
export const handleUnauthorizedError = (error: unknown) => {
  if (!isUnauthorizedError(error)) return;
  if (AUTH_PATHS.includes(window.location.pathname)) return;

  window.localStorage.removeItem('nickname');
  window.location.assign('/login');
};

// 인증 실패(401)는 재시도해도 결과가 같으므로 재시도하지 않는다.
export const shouldRetryQuery = (failureCount: number, error: unknown) =>
  !isUnauthorizedError(error) && failureCount < 3;
