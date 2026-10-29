import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { createQueryClient } from '@repo/ui/query-client';
import { ThemeProvider, CssBaseline, fundmateTheme } from '@repo/ui/theme';
import GlobalStyle from './styles/global.ts';

const queryClient = createQueryClient();

async function enableMocking() {
  const { worker } = await import('@repo/ui/mocks');
  worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ThemeProvider theme={fundmateTheme}>
        <CssBaseline />
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <GlobalStyle />
            <App />
          </QueryClientProvider>
        </BrowserRouter>
      </ThemeProvider>
    </StrictMode>,
  );
});
