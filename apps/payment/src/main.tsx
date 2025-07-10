import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { worker } from '@repo/ui/mocks';
import App from './App.tsx';
import './index.css';

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
        <App />
      </BrowserRouter>
    </StrictMode>
  );
});
