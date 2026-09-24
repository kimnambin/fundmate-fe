import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { handleUnauthorizedError, shouldRetryQuery } from '@repo/ui/utils';

const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: handleUnauthorizedError }),
  mutationCache: new MutationCache({ onError: handleUnauthorizedError }),
  defaultOptions: { queries: { retry: shouldRetryQuery } },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
