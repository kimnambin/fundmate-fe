import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import svgr from 'vite-plugin-svgr';
import dotenv from 'dotenv';
import { resolve } from 'path';
import {
  FEDERATION_SHARED,
  apiProxy,
} from '@repo/ui/vite-federation';

dotenv.config({ path: resolve(__dirname, '../../.env') });

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    federation({
      name: 'funding',
      filename: 'remoteEntry.js',
      exposes: {
        './CreateFundingPage': './src/pages/createFunding/createFunding.tsx',
        './AskFundiPage': './src/pages/askFundi/askFundi.tsx',
        './AskFundiResultPage': './src/pages/askFundi/askFundiResult.tsx',
      },
      shared: FEDERATION_SHARED,
    }),
  ],
  build: {
    target: 'esnext',
    rollupOptions: {
      external: FEDERATION_SHARED,
    },
  },
  server: {
    proxy: apiProxy(process.env.VITE_BACKEND_ADDRESS),
  },
});
