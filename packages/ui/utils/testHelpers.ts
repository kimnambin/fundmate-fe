import {
  AxiosError,
  AxiosHeaders,
  type InternalAxiosRequestConfig,
} from 'axios';

const config = { headers: new AxiosHeaders() } as InternalAxiosRequestConfig;

export const axiosError = (status: number) =>
  new AxiosError('request failed', 'ERR_BAD_REQUEST', config, undefined, {
    status,
    statusText: '',
    headers: {},
    config,
    data: {},
  });

// 응답 없이 실패한 요청 (네트워크 오류 등)
export const networkError = () =>
  new AxiosError('Network Error', 'ERR_NETWORK', config);

// auth.ts는 window.location / localStorage만 사용하므로 node 환경에 최소한의 가짜 window를 둔다.
// (최신 jsdom은 window.location을 덮어쓸 수 없어 리다이렉트 호출을 검증할 수 없다)
export const installWindow = (pathname: string) => {
  const win = {
    location: { pathname, assign: jest.fn() },
    localStorage: { removeItem: jest.fn() },
  };
  Object.defineProperty(globalThis, 'window', {
    value: win,
    configurable: true,
    writable: true,
  });
  return win;
};

export const uninstallWindow = () => {
  Reflect.deleteProperty(globalThis, 'window');
};
