import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import dotenv from 'dotenv';
import { resolve } from 'path';
import {
  FEDERATION_SHARED,
  federationDedupe,
  apiProxy,
} from '@repo/ui/vite-federation';

dotenv.config({ path: resolve(__dirname, '../../.env') });

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'payment',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductPage': './src/pages/ProductPage.tsx',
        './PaymentPage': './src/pages/PaymentPage.tsx',
        './PaymentCompleted': './src/pages/PaymentcompletedPage.tsx',
        './PaymentDetail': './src/pages/PaymentDetail.tsx',
      },
      shared: FEDERATION_SHARED,
    }),
    // tailwindcss(),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: FEDERATION_SHARED,
    },
  },
  resolve: {
    dedupe: federationDedupe,
  },
  server: {
    proxy: apiProxy(process.env.VITE_BACKEND_ADDRESS),
  },
});
