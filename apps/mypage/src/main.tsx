import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
