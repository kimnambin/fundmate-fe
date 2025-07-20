import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/global.ts';

const queryClient = new QueryClient();

async function enableMocking() {
  // TODO : 개발모드에서만 msw 사용 (권장)
  // if (import.meta.env.MODE !== 'development' || typeof window === 'undefined') {
  //   return;
  // }

  // return worker.start();

  // TODO : 좋은 방법은 아니지만 개발 모드 외에도 msw를 사용하는 방법
  const { worker } = await import('@repo/ui/mocks');
  worker.start({ onUnhandledRequest: 'bypass' });
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
