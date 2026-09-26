import {
  AxiosError,
  AxiosHeaders,
  type InternalAxiosRequestConfig,
} from 'axios';
import {
  MutationCache,
  MutationObserver,
  QueryCache,
  QueryClient,
} from '@tanstack/react-query';
import {
  handleUnauthorizedError,
  isUnauthorizedError,
  shouldRetryQuery,
} from './auth';

const config = { headers: new AxiosHeaders() } as InternalAxiosRequestConfig;

const axiosError = (status: number) =>
  new AxiosError('request failed', 'ERR_BAD_REQUEST', config, undefined, {
    status,
    statusText: '',
    headers: {},
    config,
    data: {},
  });

// 응답 없이 실패한 요청 (네트워크 오류 등)
const networkError = () => new AxiosError('Network Error', 'ERR_NETWORK', config);

// auth.ts는 window.location / localStorage만 사용하므로 node 환경에 최소한의 가짜 window를 둔다.
// (최신 jsdom은 window.location을 덮어쓸 수 없어 리다이렉트 호출을 검증할 수 없다)
const installWindow = (pathname: string) => {
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

afterEach(() => {
  Reflect.deleteProperty(globalThis, 'window');
});

describe('isUnauthorizedError', () => {
  it('상태 코드가 401인 axios 에러만 true', () => {
    expect(isUnauthorizedError(axiosError(401))).toBe(true);
  });

  it.each([400, 403, 404, 500])('axios 에러라도 %i면 false', (status) => {
    expect(isUnauthorizedError(axiosError(status))).toBe(false);
  });

  it('응답이 없는 axios 에러(네트워크 오류)는 false', () => {
    expect(isUnauthorizedError(networkError())).toBe(false);
  });

  it('axios 에러가 아니면 401처럼 생긴 객체여도 false', () => {
    expect(isUnauthorizedError(new Error('401'))).toBe(false);
    expect(isUnauthorizedError({ response: { status: 401 } })).toBe(false);
    expect(isUnauthorizedError(null)).toBe(false);
    expect(isUnauthorizedError(undefined)).toBe(false);
    expect(isUnauthorizedError('401')).toBe(false);
  });
});

describe('handleUnauthorizedError', () => {
  it('401이면 nickname을 지우고 /login으로 이동', () => {
    const win = installWindow('/mypage');

    handleUnauthorizedError(axiosError(401));

    expect(win.localStorage.removeItem).toHaveBeenCalledTimes(1);
    expect(win.localStorage.removeItem).toHaveBeenCalledWith('nickname');
    expect(win.location.assign).toHaveBeenCalledTimes(1);
    expect(win.location.assign).toHaveBeenCalledWith('/login');
  });

  it.each(['/login', '/signup', '/reset'])(
    '%s 화면에서는 401이어도 이동·삭제하지 않음',
    (pathname) => {
      const win = installWindow(pathname);

      handleUnauthorizedError(axiosError(401));

      expect(win.localStorage.removeItem).not.toHaveBeenCalled();
      expect(win.location.assign).not.toHaveBeenCalled();
    },
  );

  it.each([
    ['403 axios 에러', axiosError(403)],
    ['500 axios 에러', axiosError(500)],
    ['네트워크 오류', networkError()],
    ['일반 Error', new Error('boom')],
    ['null', null],
  ])('401이 아니면(%s) 아무것도 하지 않음', (_name, error) => {
    const win = installWindow('/mypage');

    handleUnauthorizedError(error);

    expect(win.localStorage.removeItem).not.toHaveBeenCalled();
    expect(win.location.assign).not.toHaveBeenCalled();
  });
});

describe('shouldRetryQuery', () => {
  it('401은 횟수와 상관없이 재시도하지 않음', () => {
    expect(shouldRetryQuery(0, axiosError(401))).toBe(false);
    expect(shouldRetryQuery(1, axiosError(401))).toBe(false);
  });

  it('그 외 에러는 3번 미만 실패까지만 재시도', () => {
    expect(shouldRetryQuery(0, axiosError(500))).toBe(true);
    expect(shouldRetryQuery(2, axiosError(500))).toBe(true);
    expect(shouldRetryQuery(3, axiosError(500))).toBe(false);
  });

  it('axios 에러가 아니어도 같은 규칙 적용', () => {
    expect(shouldRetryQuery(0, new Error('boom'))).toBe(true);
    expect(shouldRetryQuery(3, new Error('boom'))).toBe(false);
  });
});

// 각 앱의 main.tsx가 사용하는 QueryClient 구성과 동일하게 연결했을 때의 동작 검증
// (retryDelay만 테스트가 오래 걸리지 않도록 0으로 둔다)
describe('QueryClient 연동', () => {
  let client: QueryClient;

  beforeEach(() => {
    client = new QueryClient({
      queryCache: new QueryCache({ onError: handleUnauthorizedError }),
      mutationCache: new MutationCache({ onError: handleUnauthorizedError }),
      defaultOptions: { queries: { retry: shouldRetryQuery, retryDelay: 0 } },
    });
  });

  afterEach(() => {
    client.clear();
  });

  it('쿼리가 401로 실패하면 재시도 없이 한 번만 요청하고 로그인으로 이동', async () => {
    const win = installWindow('/mypage');
    const queryFn = jest.fn().mockRejectedValue(axiosError(401));

    await expect(
      client.fetchQuery({ queryKey: ['me'], queryFn }),
    ).rejects.toBeInstanceOf(AxiosError);

    expect(queryFn).toHaveBeenCalledTimes(1);
    expect(win.location.assign).toHaveBeenCalledTimes(1);
    expect(win.location.assign).toHaveBeenCalledWith('/login');
    expect(win.localStorage.removeItem).toHaveBeenCalledWith('nickname');
  });

  it('쿼리가 500으로 실패하면 3번 재시도하고(총 4회) 이동하지 않음', async () => {
    const win = installWindow('/mypage');
    const queryFn = jest.fn().mockRejectedValue(axiosError(500));

    await expect(
      client.fetchQuery({ queryKey: ['me'], queryFn }),
    ).rejects.toBeInstanceOf(AxiosError);

    expect(queryFn).toHaveBeenCalledTimes(4);
    expect(win.location.assign).not.toHaveBeenCalled();
  });

  it('뮤테이션이 401로 실패해도 로그인으로 이동', async () => {
    const win = installWindow('/mypage');
    const mutationFn = jest.fn().mockRejectedValue(axiosError(401));

    await expect(
      new MutationObserver(client, { mutationFn }).mutate(),
    ).rejects.toBeInstanceOf(AxiosError);

    expect(mutationFn).toHaveBeenCalledTimes(1);
    expect(win.location.assign).toHaveBeenCalledWith('/login');
  });

  it('로그인 화면에서 발생한 401은 이동하지 않음 (로그인 실패 응답)', async () => {
    const win = installWindow('/login');
    const mutationFn = jest.fn().mockRejectedValue(axiosError(401));

    await expect(
      new MutationObserver(client, { mutationFn }).mutate(),
    ).rejects.toBeInstanceOf(AxiosError);

    expect(win.location.assign).not.toHaveBeenCalled();
    expect(win.localStorage.removeItem).not.toHaveBeenCalled();
  });
});
