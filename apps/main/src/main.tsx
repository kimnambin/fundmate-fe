import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/global.ts';
import { worker } from '@repo/ui/mocks';

const queryClient = new QueryClient();

async function enableMocking() {
  if (import.meta.env.MODE !== 'development' || typeof window === 'undefined') {
    return;
  }

  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>,
  );
});
