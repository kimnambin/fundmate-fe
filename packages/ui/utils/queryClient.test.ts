import { AxiosError } from 'axios';
import { MutationObserver, type QueryClient } from '@tanstack/react-query';
import { createQueryClient } from './queryClient';
import { axiosError, installWindow, uninstallWindow } from './testHelpers';

describe('createQueryClient', () => {
  let client: QueryClient;

  beforeEach(() => {
    client = createQueryClient();
    // 재시도 간격만 0으로 줄여 테스트 시간을 단축한다 (재시도 규칙 자체는 그대로 사용)
    client.setDefaultOptions({
      queries: { ...client.getDefaultOptions().queries, retryDelay: 0 },
    });
  });

  afterEach(() => {
    client.clear();
    uninstallWindow();
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

  it('호출할 때마다 독립된 클라이언트를 만든다', () => {
    expect(createQueryClient()).not.toBe(createQueryClient());
  });
});
