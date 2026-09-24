import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
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

async function enableMocking() {
  // if (import.meta.env.MODE !== 'development' || typeof window === 'undefined') {
  //   return;
  // }

  // return worker.start();

  const { worker } = await import('@repo/ui/mocks');
  worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>
  );
});
