import {
  axiosError,
  installWindow,
  networkError,
  uninstallWindow,
} from './testHelpers';
import {
  handleUnauthorizedError,
  isUnauthorizedError,
  shouldRetryQuery,
} from './auth';

afterEach(uninstallWindow);

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
