import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { handleUnauthorizedError, shouldRetryQuery } from './auth';

// 모든 앱이 공통으로 쓰는 QueryClient.
// 401은 어느 쿼리/뮤테이션에서 발생하든 로그인 화면으로 보내고, 재시도하지 않는다.
export const createQueryClient = () =>
  new QueryClient({
    queryCache: new QueryCache({ onError: handleUnauthorizedError }),
    mutationCache: new MutationCache({ onError: handleUnauthorizedError }),
    defaultOptions: { queries: { retry: shouldRetryQuery } },
  });
