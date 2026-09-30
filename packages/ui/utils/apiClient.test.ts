import { apiClient } from './apiClient';
import { axiosError, installWindow, uninstallWindow } from './testHelpers';

afterEach(uninstallWindow);

const failWith = (status: number) => ({
  adapter: () => Promise.reject(axiosError(status)),
});

describe('apiClient', () => {
  it('withCredentials가 기본으로 켜져 있음', () => {
    expect(apiClient.defaults.withCredentials).toBe(true);
  });

  it('401 응답이면 nickname을 지우고 /login으로 이동한 뒤 에러를 그대로 전달', async () => {
    const win = installWindow('/mypage');

    await expect(apiClient.get('/api/x', failWith(401))).rejects.toMatchObject({
      response: { status: 401 },
    });

    expect(win.localStorage.removeItem).toHaveBeenCalledWith('nickname');
    expect(win.location.assign).toHaveBeenCalledWith('/login');
  });

  it('401이 아닌 에러는 이동 없이 그대로 전달', async () => {
    const win = installWindow('/mypage');

    await expect(apiClient.get('/api/x', failWith(500))).rejects.toMatchObject({
      response: { status: 500 },
    });

    expect(win.location.assign).not.toHaveBeenCalled();
  });

  it('로그인 화면에서는 401이어도 이동하지 않음', async () => {
    const win = installWindow('/login');

    await expect(apiClient.post('/api/auth/login', {}, failWith(401))).rejects.toBeDefined();

    expect(win.location.assign).not.toHaveBeenCalled();
  });
});
